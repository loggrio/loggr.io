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

# temperature = Sensor(SensorTypes.temperature.name, 'exampleRoom', ValueUnits.grad_celsius.name)
# brightness = Sensor(SensorTypes.brightness.name, 'exampleRoom', ValueUnits.lumen.name)
# humidity = Sensor(SensorTypes.humidity.name, 'exampleRoom', ValueUnits.percent.name)
# pressure = Sensor(SensorTypes.pressure.name, 'exampleRoom', ValueUnits.pascal.name, pressure.read_pressure)

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

    config = ConfigParser()
    config.read(CONFIG_FILE)
    sensor_configs = config.options('SENSORS')

    for sensor in sensor_configs:
        script = config.get('SENSORS', sensor).split(',')[0]
        location = config.get('SENSORS', sensor).split(',')[1]
        unit = config.get('SENSORS', sensor).split(',')[2]

        script_suffix = script.split('.')[1]

        if script_suffix == 'py':
            p = 'sensors/' + script
            func = imp.load_source('meter', p)
            sensors[sensor] = Sensor(sensor, location, unit, func.meter)
        else:
            sensors[sensor] = Sensor(sensor, location, unit)

    while (True):
        for s in sensors.itervalues():
            ret = s.meter_and_send()
            if ret == 200:
                set_status_led(LedStatusTypes.ok.name)

        time.sleep(TIME_BETWEEN_METERINGS)
