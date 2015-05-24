#!/usr/bin/env python
# -*- coding: utf-8 -*-
import requests
import json
import subprocess
import logging
from datetime import datetime
from .util import set_status_led
from .util import LedStatusTypes

# TODO: CONFIG FILE
DB = 'meterings'
PATH = 'sensors/'
SUFFIX = '.out'
API = 'http://0.0.0.0:3000/api'


class Sensor:
    """docstring for Sensor"""

    def __init__(self, sensor_name, location, sensor_type, unit):
        self.sensor_name = sensor_name
        self.location = location
        self.sensor_type = sensor_type
        self.unit = unit

    def __meter(self):
        command = PATH + self.sensor_type + SUFFIX
        try:
            subproc_output = subprocess.check_output(command,
                                                     stderr=subprocess.STDOUT)

        except subprocess.CalledProcessError, cpe:
            if cpe.returncode == 1:
                logging.error('called process error: ' + str(cpe.cmd[0]) + ' returned 1: ' + cpe.output)
                print 'called process error: ' + str(cpe.cmd[0]) + ' returned 1: ' + cpe.output
            elif cpe.returncode == 2:
                logging.error('called process error: ' + str(cpe.cmd[0]) + ' returned 2: ' + cpe.output)
                print 'called process error: ' + str(cpe.cmd[0]) + ' returned 2: ' + cpe.output
            elif cpe.returncode == 3:
                logging.error('called process error: ' + str(cpe.cmd[0]) + ' returned 3: ' + cpe.output)
                print 'called process error: ' + str(cpe.cmd[0]) + ' returned 3: ' + cpe.output
        except OSError, ose:
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
            logging.error('requests failure: ' + str(e))
            print 'requests failure: ' + str(e)
            set_status_led(LedStatusTypes.client_error.name)
        else:
            return r.status_code

    def meter_and_send(self):
        value = self.__meter()
        payload = {'sensorName': self.sensor_name,
                   'location': self.location,
                   'sensorType': self.sensor_type,
                   'time': str(datetime.now()),
                   'value': value,
                   'unit': self.unit,
                   'userId': '1'}

        return self.__send(payload)
