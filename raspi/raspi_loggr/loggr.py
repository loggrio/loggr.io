#!/usr/bin/env python
# -*- coding: utf-8 -*-
import time
import logging
from os import path
from enum import Enum

from .sensor import Sensor
from .util import set_status_led
from .util import LedStatusTypes
from .util import SensorTypes
from .util import ValueUnits
from .util import treat_config_errors
from .pressure import pressure

temperature = Sensor(SensorTypes.temperature.name, 'exampleRoom', ValueUnits.grad_celsius.name)
brightness = Sensor(SensorTypes.brightness.name, 'exampleRoom', ValueUnits.lumen.name)
humidity = Sensor(SensorTypes.humidity.name, 'exampleRoom', ValueUnits.percent.name)
pressure = Sensor(SensorTypes.pressure.name, 'exampleRoom', ValueUnits.pascal.name, pressure.read_pressure)

TIME_BETWEEN_METERINGS = 60

HOME_DIR = path.expanduser("~")
CONFIG_FILE = HOME_DIR + '/.loggrrc'


def main():
    logging.basicConfig(format='%(asctime)s: %(levelname)s: %(message)s', filename='loggr.log', level=logging.INFO)
    logging.info('Logging (re)started')

    if not path.isfile(CONFIG_FILE):
        treat_config_errors()
        return

    while (True):
        ret1 = temperature.meter_and_send()
        ret2 = brightness.meter_and_send()
        ret3 = humidity.meter_and_send()
        ret4 = pressure.meter_and_send()

        if ret1 == 200 and ret2 == 200 and ret3 == 200 and ret4 == 200:
            set_status_led(LedStatusTypes.ok.name)

        time.sleep(TIME_BETWEEN_METERINGS)
