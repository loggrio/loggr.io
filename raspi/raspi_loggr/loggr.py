#!/usr/bin/env python
# -*- coding: utf-8 -*-
import time
import logging
from enum import Enum

from .sensor import Sensor
from .util import set_status_led
from .util import LedStatusTypes


class SensorTypes(Enum):
    temperature = 1
    brightness = 2
    humidity = 3
    volume = 4


class ValueUnits(Enum):
    grad_celsius = 1
    grad_fahrenheit = 2
    percent = 3
    lumen = 4
    decibel = 5


# emu_sensor = Sensor('emu_sensor')
temperature = Sensor('tempSensor1', 'exampleRoom', SensorTypes.temperature.name, ValueUnits.grad_celsius.name)
brightness = Sensor('brightSensor1', 'exampleRoom', SensorTypes.brightness.name, ValueUnits.lumen.name)
humidity = Sensor('humidSensor1', 'exampleRoom', SensorTypes.humidity.name, ValueUnits.percent.name)
# volume = Sensor('3', 'volSensor1', 'exampleRoom', SensorTypes.volume.name)

TIME_BETWEEN_METERINGS = 60


def main():
    logging.basicConfig(format='%(asctime)s: %(levelname)s: %(message)s', filename='loggr.log', level=logging.INFO)
    logging.info('Logging (re)started')

    while (True):
        ret1 = temperature.meter_and_send()
        ret2 = brightness.meter_and_send()
        ret3 = humidity.meter_and_send()
        # ret4 = send_data(payload_vol)

        if ret1 == 200 and ret2 == 200 and ret3 == 200:
            set_status_led(LedStatusTypes.ok.name)

        time.sleep(TIME_BETWEEN_METERINGS)
