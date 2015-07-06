#!/usr/bin/env python
# -*- coding: utf-8 -*-
import subprocess
import logging
from enum import Enum


class LedStatusTypes(Enum):
    """Enum of led status types resp. colors"""
    ok = 1  # green
    sensor_broken = 2  # red
    request_error = 3  # orange
    pairing_succeeded = 4  # blue


class SensorTypes(Enum):
    """Enum of sensor types"""
    temperature = 1
    brightness = 2
    humidity = 3
    pressure = 4


def log_info(info):
    """Log info messages in logfile and console

    Args:
        info (str): info message which has to be logged
    """
    logging.info(info)
    print info


def log_error(err):
    """Log error messages in logfile and console

    Args:
        err (str): error message which has to be logged
    """
    logging.error(err)
    print err


def treat_sensor_errors(cpe):
    """Log sensor errors

    Args:
        cpe (subprocess.CalledProcessError): called process error exception object
    """
    log_error('called process error: ' + str(cpe.cmd) + ' returned ' + str(cpe.returncode) + ': ' + cpe.output)


def treat_os_errors(ose):
    """Log os errors

    Args:
        ose (OSError): os error exception object
    """
    log_error('oserror: ' + str(ose.strerror))


def treat_led_errors(cpe):
    """Log led errors

    Args:
        cpe (subprocess.CalledProcessError): called process error exception object
    """
    if cpe.returncode == 1:
        log_error('called process error: ' + str(cpe.cmd[0]) + ' returned 1: setup wiringPi failed')
    elif cpe.returncode == 2:
        log_error('called process error: ' + str(cpe.cmd[0]) + ' returned 2: invalid arguments')


def treat_requests_errors(re):
    """Log requests errors and set status led color to orange

    Args:
        re (requests.exceptions.RequestException): request exception object
    """
    log_error('requests failure: ' + str(re))
    set_status_led(LedStatusTypes.request_error.name)


def treat_sensor_broken_errors(sensortype):
    """Log broken sensor errors and set status led color to red

    Args:
        sensortype (str): type of sensor
    """
    log_error(str(sensortype) + ' sensor broken')
    set_status_led(LedStatusTypes.sensor_broken.name)


def treat_missing_config_errors():
    """Log missing config file errors"""
    log_error('No valid config file found! Please start config server!')


def treat_pairing_errors():
    """Log pairing errors"""
    log_error('No Token and/or UserId set in config file. Please pair your Raspberry Pi!')


def set_status_led(status):
    """Set status led color

    Args:
        status (LedStatusTypes): led status type resp. color of rgb led
    """
    command = ['sensors/rgb.out', str(status)]
    try:
        subproc = subprocess.check_call(command,
                                        stdout=subprocess.PIPE,
                                        stderr=subprocess.PIPE)
    except subprocess.CalledProcessError as cpe:
        # catch invalid arguments errors
        # catch wiringPi errors
        treat_led_errors(cpe)
    except OSError as ose:
        # catch os errors, e.g. file-not-found
        treat_os_errors(ose)
