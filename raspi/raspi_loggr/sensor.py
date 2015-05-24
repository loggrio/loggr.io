#!/usr/bin/env python
# -*- coding: utf-8 -*-
import requests
import json
import subprocess
import logging
from datetime import datetime

# TODO: CONFIG FILE
LOG_FILE = 'log.txt'
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
        subproc = subprocess.Popen(command,
                                   stdout=subprocess.PIPE,
                                   stderr=subprocess.PIPE)

        sout = subproc.stdout.read()
        serr = subproc.stderr.read()

        subproc.wait()
        logging.info('metering of ' + self.sensor_type + ' sensor, returncode: ' + str(subproc.returncode))

        return sout if len(sout) else serr

    def __send(self, payload):
        headers = {'Content-Type': 'application/json'}
        r = requests.post(API + "/" + DB, data=json.dumps(payload), headers=headers)

        # print r.text

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
