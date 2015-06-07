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
    last_metering = 0.0
    first_metering = True

    def __init__(self, sensor_name, location, sensor_type, unit, func=None):
        self.sensor_name = sensor_name
        self.location = location
        self.sensor_type = sensor_type
        self.unit = unit
        self.func = func

    def __check(self, metering):
        metering = float(metering)
        if self.first_metering is True:
            self.first_metering = False
            self.last_metering = metering
            return False
        else:
            if self.sensor_type == SensorTypes.temperature.name:
                if metering < (self.last_metering - 10.0) or metering > (self.last_metering + 10.0):
                    return False
                elif metering < -270.0:
                    return False
                elif metering > 200.0:
                    return False
                else:
                    self.last_metering = metering
                    return True
            if self.sensor_type == SensorTypes.humidity.name:
                if metering < (self.last_metering - 10.0) or metering > (self.last_metering + 10.0):
                    return False
                elif metering < 0.0:
                    return False
                elif metering > 100.0:
                    return False
                else:
                    self.last_metering = metering
                    return True
            if self.sensor_type == SensorTypes.brightness.name:
                if metering > 210.0:
                    return False
                elif metering < 0.0:
                    return False
                else:
                    return True
            if self.sensor_type == SensorTypes.volume.name:
                if metering < 0.0:
                    return False
                else:
                    return True
            if self.sensor_type == SensorTypes.pressure.name:
                if metering < (self.last_metering - 1000.0) or metering > (self.last_metering + 1000.0):
                    return False
                elif metering < 0.0:
                    return False
                else:
                    self.last_metering = metering
                    return True

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
                good_data = self.__check(subproc_output)
                if good_data is True:
                    logging.info('metering of ' + self.sensor_type + ' sensor: ' + str(subproc_output))
                    print 'metering of ' + self.sensor_type + ' sensor: ' + str(subproc_output)
                    return subproc_output
                else:
                    return 'false_data'

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
        value = 'false_data'

        while value == 'false_data' and counter < 5:
            value = self.__meter()
            counter = counter + 1

        if counter == 5:
            logging.error(self.sensor_type + 'sensor broken')
            print self.sensor_type + 'sensor broken'
            set_status_led(LedStatusTypes.sensor_broken.name)
            return

        payload = {'sensorName': self.sensor_name,
                   'location': self.location,
                   'sensorType': self.sensor_type,
                   'time': str(datetime.now()),
                   'value': value,
                   'unit': self.unit,
                   'userId': '1'}

        return self.__send(payload)
