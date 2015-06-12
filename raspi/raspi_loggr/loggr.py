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

temperature = Sensor('tempSensor1', 'exampleRoom', SensorTypes.temperature.name, ValueUnits.grad_celsius.name)
brightness = Sensor('brightSensor1', 'exampleRoom', SensorTypes.brightness.name, ValueUnits.lumen.name)
humidity = Sensor('humidSensor1', 'exampleRoom', SensorTypes.humidity.name, ValueUnits.percent.name)
pressure = Sensor('pressureSensor1', 'exampleRoom', SensorTypes.pressure.name, ValueUnits.pascal.name,
                  pressure.read_pressure)

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
