#!/usr/bin/env python
# -*- coding: utf-8 -*-
import requests
import json
import subprocess
import logging
from datetime import datetime
from .util import set_status_led
from .util import LedStatusTypes
from .util import SensorTypes

# TODO: CONFIG FILE
DB = 'meterings'
PATH = 'sensors/'
SUFFIX = '.out'
API = 'http://0.0.0.0:3000/api'


class Sensor:
    """docstring for Sensor"""
    last_metering_humidity = 0
    last_metering_temperature = 0

    def __init__(self, sensor_name, location, sensor_type, unit, func=None):
        self.sensor_name = sensor_name
        self.location = location
        self.sensor_type = sensor_type
        self.unit = unit
        self.func = func

    # TODO: fix compares!
    def __check(self, metering):
        if self.sensor_type == SensorTypes.temperature.name:
            if float(self.last_metering_temperature) < float(metering) - 10 or float(self.last_metering_temperature) > float(metering) + 10:
                return 0
            elif float(metering) < -270:
                return 0
            elif float(metering) > 200:
                return 0
            else:
                self.last_metering = metering
                return 1
        if self.sensor_type == SensorTypes.humidity.name:
            if float(self.last_meterng_humidity) < float(metering) - 10 or float(self.last_metering_humidity) > float(metering) + 10:
                return 0
            elif float(metering) < 0:
                return 0
            elif float(metering) > 100:
                return 0
            else:
                self.last_metering = metering
                return 1
        if self.sensor_type == SensorTypes.brightness.name:
            if float(metering) > 210:
                return 0
            elif float(metering) < 0:
                return 0
            else:
                return 1
        if self.sensor_type == SensorTypes.volume.name:
            if float(metering) < 0:
                return 0
            else:
                return 1

    def __meter(self):
        if self.func is not None:
            value = str(self.func())
            logging.info('metering of ' + self.sensor_type + ' sensor: ' + value)
            print 'metering of ' + self.sensor_type + ' sensor: ' + value
            return value
        else:
            command = PATH + self.sensor_type + SUFFIX
            try:
                subproc_output = subprocess.check_output(command, stderr=subprocess.STDOUT)
            except subprocess.CalledProcessError, cpe:
                if cpe.returncode == 1:
                    # catch wiringPi errors
                    logging.error('called process error: ' + str(cpe.cmd[0]) + ' returned 1: ' + cpe.output)
                    print 'called process error: ' + str(cpe.cmd[0]) + ' returned 1: ' + cpe.output
                elif cpe.returncode == 2:
                    # catch open device file errors of mounted devices
                    logging.error('called process error: ' + str(cpe.cmd[0]) + ' returned 2: ' + cpe.output)
                    print 'called process error: ' + str(cpe.cmd[0]) + ' returned 2: ' + cpe.output
                elif cpe.returncode == 3:
                    # catch read errors on devices
                    logging.error('called process error: ' + str(cpe.cmd[0]) + ' returned 3: ' + cpe.output)
                    print 'called process error: ' + str(cpe.cmd[0]) + ' returned 3: ' + cpe.output
            except OSError, ose:
                # catch os errors, e.g. file-not-found
                logging.error('oserror: ' + str(ose.strerror))
                print 'oserror: ' + str(ose.strerror)
            else:
                logging.info('metering of ' + self.sensor_type + ' sensor: ' + str(subproc_output))
                print 'metering of ' + self.sensor_type + ' sensor: ' + str(subproc_output)
                return subproc_output

    def __send(self, payload):
        headers = {'Content-Type': 'application/json'}
        try:
            r = requests.post(API + "/" + DB, data=json.dumps(payload), headers=headers)
        except requests.exceptions.RequestException, e:
            # catch requests errors
            logging.error('requests failure: ' + str(e))
            print 'requests failure: ' + str(e)
            set_status_led(LedStatusTypes.request_error.name)
        else:
            logging.info('requests status code: ' + str(r.status_code))
            return r.status_code

    def meter_and_send(self):
        counter = 0
        value = self.__meter()
        good_data = self.__check(value)

        while good_data == 0 or counter < 5:
             value = self.__meter()
             good_data = self.__check(value)
             counter = counter + 1

        if counter == 5:
             # logging.error(self.sensor_type + 'sensor broken')
             # print self.sensor_type + 'sensor broken'
             # set_status_led(LedStatusTypes.sensor_broken.name)
             return

        payload = {'sensorName': self.sensor_name,
                   'location': self.location,
                   'sensorType': self.sensor_type,
                   'time': str(datetime.now()),
                   'value': value,
                   'unit': self.unit,
                   'userId': '1'}

        return self.__send(payload)
