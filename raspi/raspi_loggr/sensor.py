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

PATH = 'sensors/'
API = 'http://0.0.0.0:3000/api/'
CUSTOMERS = 'Customers/'
METERINGS = '/meterings'
SENSORS = '/sensors'

config = ConfigParser()

HOME_DIR = path.expanduser("~")
CONFIG_FILE = HOME_DIR + '/.loggrrc'

config.read(CONFIG_FILE)
if config.has_option('AUTH', 'token'):
    TOKEN = config.get('AUTH', 'token')
if config.has_option('AUTH', 'userid'):
    USER_ID = config.get('AUTH', 'userid')


class Sensor:
    """docstring for Sensor"""
    last_metering = 0.0
    first_metering = True

    def __init__(self, sensor_type, location, unit, func=None, script=None, cache_size=1440):
        self.id = self.__db_sync(sensor_type, location, unit)
        self.location = location
        self.type = sensor_type
        self.unit = unit
        self.func = func
        self.script = script
        self.cache = deque([], cache_size)

    def __db_sync(self, sensor_type, location, unit):
        headers = {'Content-Type': 'application/json', 'Authorization': TOKEN}
        try:
            # http://0.0.0.0:3000/api/Customers/{userid}/sensors?filter=[where][type]={type}
            params = {'filter[where][type]': sensor_type, 'filter[where][location]': location}
            r = requests.get(API + CUSTOMERS + USER_ID + SENSORS, params=params, headers=headers)

            if not len(r.json()):
                payload = {'type': sensor_type, 'location': location, 'unit': unit}
                r = requests.post(API + CUSTOMERS + USER_ID + SENSORS, data=json.dumps(payload), headers=headers)
                return r.json()['id']
        except requests.exceptions.RequestException, re:
            # catch and treat requests errors
            treat_requests_errors(re)
        else:
            logging.info('requests status code: ' + str(r.status_code))
            return r.json()[0]['id']

    def __check(self, metering):
        metering = float(metering)
        if self.first_metering is True:
            self.first_metering = False
            self.last_metering = metering
            return False
        else:
            if self.type == SensorTypes.temperature.name:
                if metering < (self.last_metering - 10.0) or metering > (self.last_metering + 10.0):
                    return False
                elif metering < -270.0:
                    return False
                elif metering > 200.0:
                    return False
                else:
                    self.last_metering = metering
                    return True
            if self.type == SensorTypes.humidity.name:
                if metering < (self.last_metering - 10.0) or metering > (self.last_metering + 10.0):
                    return False
                elif metering < 0.0:
                    return False
                elif metering > 100.0:
                    return False
                else:
                    self.last_metering = metering
                    return True
            if self.type == SensorTypes.brightness.name:
                if metering > 210.0:
                    return False
                elif metering < 0.0:
                    return False
                else:
                    return True
            if self.type == SensorTypes.pressure.name:
                if metering < (self.last_metering - 10.0) or metering > (self.last_metering + 10.0):
                    return False
                elif metering < 0.0:
                    return False
                else:
                    self.last_metering = metering
                    return True

    def __meter(self):
        if self.func is not None:
            value = str(self.func() / 100.00)
            logging.info('metering of ' + self.type + ' sensor: ' + value)
            print 'metering of ' + self.type + ' sensor: ' + value
            return value
        else:
            command = PATH + self.script
            try:
                subproc_output = subprocess.check_output(command, stderr=subprocess.STDOUT)
            except subprocess.CalledProcessError, cpe:
                # catch and treat wiringPi errors
                # catch and treat open device file errors of mounted devices
                # catch and treat read errors on devices
                treat_sensor_errors(cpe)
            except OSError, ose:
                # catch and treat os errors, e.g. file-not-found
                treat_os_errors(ose)
            else:
                good_data = self.__check(subproc_output)
                if good_data is True:
                    logging.info('metering of ' + self.type + ' sensor: ' + str(subproc_output))
                    print 'metering of ' + self.type + ' sensor: ' + str(subproc_output)
                    return subproc_output
                else:
                    return 'false_data'

    def __send(self, payload):
        headers = {'Content-Type': 'application/json', 'Authorization': TOKEN}
        try:
            # http://0.0.0.0:3000/api/Customers/{userid}/Meterings?filter[where][id]={self.id}
            params = {'filter[where][id]': self.id}
            r = requests.post(API + CUSTOMERS + USER_ID + METERINGS, data=json.dumps(payload), params=params,
                              headers=headers)
        except requests.exceptions.RequestException, re:
            # catch and treat requests errors
            treat_requests_errors(re)
        else:
            logging.info('requests status code: ' + str(r.status_code))
            return r.status_code

    def meter_and_send(self):
        counter = 0
        value = 'false_data'

        while value == 'false_data' and counter < 5:
            value = self.__meter()
            counter = counter + 1

        if counter == 5:
            treat_sensor_broken_errors(self.type)
            return

        payload = {'sensorId': self.id,
                   'time': str(datetime.now()),
                   'value': value}

        # frist try to empty cache if data in it
        while self.cache():
            data = self.cache.popleft()
            status = self.__send(data)
            # on failure put back to cache and return
            if status != 200:
                self.cache.appendleft(data)
                # also add new metering
                self.cache.append(payload)
                return -1 # TODO ERROR CODE ??

        # try to send
        status = self.__send(payload)

        # on failure put to cache and return
        if status != 200:
            self.cache.append(payload)
            return -1 # TODO ERROR CODE ??

        return status_code
