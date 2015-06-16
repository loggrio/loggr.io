#!/usr/bin/env python
# -*- coding: utf-8 -*-
import subprocess
import logging
from enum import Enum


class LedStatusTypes(Enum):
    ok = 1  # green
    sensor_broken = 2  # red
    request_error = 3  # orange


class SensorTypes(Enum):
    temperature = 1
    brightness = 2
    humidity = 3
    pressure = 4


class ValueUnits(Enum):
    grad_celsius = 1
    grad_fahrenheit = 2
    percent = 3
    lumen = 4
    hectopascal = 5


def treat_sensor_errors(cpe):
    # log sensor errors in logfile and console
    logging.error('called process error: ' + str(cpe.cmd) + ' returned ' + str(cpe.returncode) + ': ' + cpe.output)
    print 'called process error: ' + str(cpe.cmd) + ' returned ' + str(cpe.returncode) + ': ' + cpe.output


def treat_os_errors(ose):
    # log os errors in logfile and console
    logging.error('oserror: ' + str(ose.strerror))
    print 'oserror: ' + str(ose.strerror)


def treat_led_errors(cpe):
    # log led errors in logfile and console
    if cpe.returncode == 1:
        logging.error('called process error: ' + str(cpe.cmd[0]) + ' returned 1: setup wiringPi failed')
        print 'called process error: ' + str(cpe.cmd[0]) + ' returned 1: setup wiringPi failed'
    elif cpe.returncode == 2:
        logging.error('called process error: ' + str(cpe.cmd[0]) + ' returned 2: invalid arguments')
        print 'called process error: ' + str(cpe.cmd[0]) + ' returned 2: invalid arguments'


def treat_requests_errors(re):
    # log requests errors in logfile and console and set status led color to orange
    logging.error('requests failure: ' + str(re))
    print 'requests failure: ' + str(re)
    set_status_led(LedStatusTypes.request_error.name)


def treat_sensor_broken_errors(sensortype):
    # log sensor broken errors in logfile and console and set status led color to red
    logging.error(str(sensortype) + ' sensor broken')
    print str(sensortype) + ' sensor broken'
    set_status_led(LedStatusTypes.sensor_broken.name)


def treat_config_errors():
    logging.error('No config file found! Please start config server!')
    print 'No config file found! Please start config server!'


def set_status_led(status):
    command = ['sensors/rgb.out', str(status)]
    try:
        subproc = subprocess.check_call(command,
                                        stdout=subprocess.PIPE,
                                        stderr=subprocess.PIPE)
    except subprocess.CalledProcessError, cpe:
        # catch invalid arguments errors
        # catch wiringPi errors
        treat_led_errors(cpe)
    except OSError, ose:
        # catch os errors, e.g. file-not-found
        treat_os_errors(ose)
