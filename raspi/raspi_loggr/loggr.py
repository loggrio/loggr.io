#!/usr/bin/env python
# -*- coding: utf-8 -*-
import time
import subprocess
import logging
import requests
from enum import Enum

from .sensor import Sensor
from .util import set_status_led
from .util import LedStatusTypes
from .util import SensorTypes
from .util import ValueUnits
from .pressure import pressure

temperature = Sensor('tempSensor1', 'exampleRoom', SensorTypes.temperature.name, ValueUnits.grad_celsius.name)
brightness = Sensor('brightSensor1', 'exampleRoom', SensorTypes.brightness.name, ValueUnits.lumen.name)
humidity = Sensor('humidSensor1', 'exampleRoom', SensorTypes.humidity.name, ValueUnits.percent.name)
pressure = Sensor('pressureSensor1', 'exampleRoom', SensorTypes.pressure.name, ValueUnits.pascal.name,
                  pressure.read_pressure)

TIME_BETWEEN_METERINGS = 60 # TODO: maybe we should time this more exactly


def main():
    logging.basicConfig(format='%(asctime)s: %(levelname)s: %(message)s', filename='loggr.log', level=logging.INFO)
    logging.info('Logging (re)started')

    while (True):
        try:
            ret1 = temperature.meter_and_send()
            ret2 = brightness.meter_and_send()
            ret3 = humidity.meter_and_send()
            ret4 = pressure.meter_and_send()

            if ret1 == 200 and ret2 == 200 and ret3 == 200 and ret4 == 200:
                set_status_led(LedStatusTypes.ok.name)
        except subprocess.CalledProcessError, cpe:
            if cpe.returncode == 1:
                # catch wiringPi errors
                logging.error('called process error: ' + str(cpe.cmd[0]) + ' returned 1: setup wiringPi failed!')
                print 'called process error: ' + str(cpe.cmd[0]) + ' returned 1: setup wiringPi failed!'
            elif cpe.returncode == 2:
                # catch open device file errors of mounted devices
                logging.error('called process error: ' + str(cpe.cmd[0]) + ' returned 2: ' + cpe.output)
                print 'called process error: ' + str(cpe.cmd[0]) + ' returned 2: ' + cpe.output
            elif cpe.returncode == 3:
                # catch read errors on devices
                logging.error('called process error: ' + str(cpe.cmd[0]) + ' returned 3: ' + cpe.output)
                print 'called process error: ' + str(cpe.cmd[0]) + ' returned 3: ' + cpe.output
            elif cpe.returncode == 4:
                # catch invalid arguments errors
                logging.error('called process error: ' + str(cpe.cmd[0]) + ' returned 1: invalid arguments!')
                print 'called process error: ' + str(cpe.cmd[0]) + ' returned 1: invalid arguments!'
        except requests.exceptions.RequestException, re:
            # catch requests errors
            logging.error('requests failure: ' + str(re))
            print 'requests failure: ' + str(re)
            set_status_led(LedStatusTypes.request_error.name)
        except OSError, ose:
            # catch os errors, e.g. file-not-found
            logging.error('oserror: ' + str(ose.strerror))
            print 'oserror: ' + str(ose.strerror)
        finally:
            time.sleep(TIME_BETWEEN_METERINGS)
