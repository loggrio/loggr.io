#!/usr/bin/env python
# -*- coding: utf-8 -*-
import requests
import json
import subprocess
import logging
from collections import deque
from datetime import datetime
from os import path
from ConfigParser import ConfigParser
from .util import treat_os_errors
from .util import treat_led_errors
from .util import treat_sensor_errors
from .util import treat_requests_errors
from .util import treat_sensor_broken_errors
from .util import SensorTypes
from .util import log_error
from .util import log_info

config = ConfigParser()

HOME_DIR = path.expanduser("~")
CONFIG_FILE = HOME_DIR + '/.loggrrc'

config.read(CONFIG_FILE)
if config.has_option('AUTH', 'token'):
    token = config.get('AUTH', 'token')
if config.has_option('AUTH', 'userid'):
    user_id = config.get('AUTH', 'userid')
if config.has_option('API', 'url'):
    api = config.get('API', 'url')
if config.has_option('COMMON', 'script_path'):
    scripts_path = config.get('COMMON', 'scripts_path')

SENSORS_URL = api + 'Customers/' + user_id + '/sensors'
METERINGS_URL = api + 'Customers/' + user_id + '/meterings'


class Sensor:
    """Sensor class"""

    def __init__(self, sensor_type, location, unit,
                 minimum=None, maximum=None, deviation=None,
                 func=None, gen=None, script=None,
                 cache_size=1440):
        """Constructor of sensor class

        Args:
            sensor_type (str): type of sensor
            location (str): location of sensor
            unit (str): unit of metering (written-out e.g. grad_celsius)
            minimum (str): minimum value of metering (default = None)
            maximum (str): maximum value of metering (default = None)
            deviation (str): allowed deviation of metering (default = None)
            func (str): name of function used for metering (default = None)
            gen (str): name of generator used for metering (default = None)
            script (str): name of script used for metering (default = None)
            cache_size (int): size of local buffer in byte (default = 1440)
        """
        self.id = self.__db_sync(sensor_type, location, unit)
        self.location = location
        self.type = sensor_type
        self.unit = unit
        self.func = func
        self.gen = gen
        self.script = script
        self.cache = deque([], cache_size)
        self.last_metering = None
        self.minimum = minimum
        self.maximum = maximum
        self.deviation = deviation

    def __db_sync(self, sensor_type, location, unit):
        """Get existing sensor id from api or create new sensor

        Args:
            sensor_type (str): type of sensor
            location (str): location of sensor
            unit (str): unit of metering (written-out e.g. grad_celsius)

        Returns:
            sensor id (str): id of current sensor
        """
        headers = {'Content-Type': 'application/json', 'Authorization': token}
        try:
            # http://0.0.0.0:3000/api/Customers/{userid}/sensors?filter=[where][type]={type}
            params = {'filter[where][type]': sensor_type, 'filter[where][location]': location}
            r = requests.get(api + customers + user_id + sensors, params=params, headers=headers)

            if not len(r.json()):
                payload = {'type': sensor_type, 'location': location, 'unit': unit}
                r = requests.post(SENSORS_URL, data=json.dumps(payload), headers=headers)
                return r.json()['id']
        except requests.exceptions.RequestException, re:
            # catch and treat requests errors
            treat_requests_errors(re)
        else:
            logging.info('requests status code: ' + str(r.status_code))
            return r.json()[0]['id']

    def __check(self, metering):
        """Check value of metering for validity

        Args:
            metering (float): value of metering

        Returns:
            False - if value is not valid
            True - if value is valid
        """
        metering = float(metering)

        # check deviation
        if self.deviation and self.last_metering and abs(self.last_metering - metering) > self.deviation:
            return False

        # check minimum
        if self.minimum and metering < self.minimum:
            return False

        # check maximum
        if self.maximum and metering > self.maximum:
            return False

        self.last_metering = metering

        return True

    def __meter(self):
        """Get metering

        Returns:
            value (str): value of successful metering - if metering was successful
            None - if an error occured
        """
        if self.func is not None:
            value = str(self.func())
            log_info('metering of ' + self.type + ' sensor: ' + value)
            if self.__check(value):
                log_info('metering of ' + self.type + ' sensor: ' + value)
                return value

            return False

        if self.gen is not None:
            value = str(self.gen.next())
            if self.__check(value):
                log_info('metering of ' + self.type + ' sensor: ' + value)
                return value

            return False

        command = scripts_path + self.script
        try:
            subproc_output = subprocess.check_output(command, stderr=subprocess.STDOUT)
        except subprocess.CalledProcessError, cpe:
            # catch and treat wiringPi errors
            # catch and treat open device file errors of mounted devices
            # catch and treat read errors on devices
            treat_sensor_errors(cpe)
            return None
        except OSError, ose:
            # catch and treat os errors, e.g. file-not-found
            treat_os_errors(ose)
            return None
        else:
            # check if data is good
            if self.__check(subproc_output):
                log_info('metering of ' + self.type + ' sensor: ' + str(subproc_output))
                return subproc_output

            return False

    def __send(self, payload):
        """Send metering data to server api

        Args:
            payload (str): json file of metering data which has to be sensor_type

        Returns:
            request status code (int): HTTP status code of POST request
        """
        headers = {'Content-Type': 'application/json', 'Authorization': token}
        try:
            # http://0.0.0.0:3000/api/Customers/{userid}/Meterings?filter[where][id]={self.id}
            params = {'filter[where][id]': self.id}
            r = requests.post(METERINGS_URL, data=json.dumps(payload), params=params,
                              headers=headers)
        except requests.exceptions.RequestException, re:
            # catch and treat requests errors
            treat_requests_errors(re)
        else:
            logging.info('requests status code: ' + str(r.status_code))
            return r.status_code

    def meter_and_send(self):
        """Call meter and send method

        Returns:
            status (str): HTTP status code of POST request
        """
        value = self.__meter()

        # return if meter raises an exception
        if value is None:
            return

        # remeter max 5 times on bad data
        counter = 1
        while value is False:
            value = self.__meter()
            counter += 1
            if counter == 5:
                treat_sensor_broken_errors(self.type)
                return

        payload = {'sensorId': self.id,
                   'time': str(datetime.now()),
                   'value': value}

        # first try to empty cache if there is data in it
        if self.cache:
            log_info('data in ' + self.type + ' cache, try to empty queue first')

            while self.cache:
                data = self.cache.popleft()
                status = self.__send(data)
                # on failure put back to cache and return
                if status != 200:
                    self.cache.appendleft(data)
                    # also add new metering
                    self.cache.append(payload)
                    log_info('requests error: ' + self.type + ' data cached')
                    return

            log_info(self.type + ' cache emptied')

        # try to send
        status = self.__send(payload)

        # on failure put to cache and return
        if status != 200:
            self.cache.append(payload)
            log_info('requests error: ' + self.type + ' data cached')
            return

        return status
