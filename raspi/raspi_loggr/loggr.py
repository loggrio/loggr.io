#!/usr/bin/env python
# -*- coding: utf-8 -*-
import time
import imp
import logging
from os import path
from enum import Enum

from .sensor import Sensor
from ConfigParser import ConfigParser
from .util import set_status_led
from .util import LedStatusTypes
from .util import SensorTypes
from .util import ValueUnits
from .util import treat_config_errors

TIME_BETWEEN_METERINGS = 60

HOME_DIR = path.expanduser("~")
CONFIG_FILE = HOME_DIR + '/.loggrrc'


def main():
    logging.basicConfig(format='%(asctime)s: %(levelname)s: %(message)s', filename='loggr.log', level=logging.INFO)
    logging.info('Logging (re)started')

    if not path.isfile(CONFIG_FILE):
        treat_config_errors()
        return

    sensors = {}

    # Create config
    config = ConfigParser()
    # Read config file
    config.read(CONFIG_FILE)

    # Get list of options from config file (section: SENSORS)
    sensor_configs = config.options('SENSORS')

    # Iterate through sensor configs from config file
    for sensor in sensor_configs:
        # Get script name from config file
        script = config.get('SENSORS', sensor).split(',')[0]
        # Get location from config file
        location = config.get('SENSORS', sensor).split(',')[1]
        # Get unit from config file
        unit = config.get('SENSORS', sensor).split(',')[2]
        # Get script suffix
        script_suffix = script.split('.')[1]

        if script_suffix == 'py':
            # Path to metering script
            p = 'sensors/' + script
            # Get function reference and import module generically
            func = imp.load_source('meter', p)
            # Create sensor generically and save it into a dictionary
            sensors[sensor] = Sensor(sensor, location, unit, func.meter)
        else:
            # Create sensor generically and save it into a dictionary
            sensors[sensor] = Sensor(sensor, location, unit)

    while (True):
        # Iterate through sensor config values
        for s in sensors.itervalues():
            # Start metering and sending
            ret = s.meter_and_send()
            if ret == 200:
                set_status_led(LedStatusTypes.ok.name)

        time.sleep(TIME_BETWEEN_METERINGS)
