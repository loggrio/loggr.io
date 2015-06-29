#!/usr/bin/env python
# -*- coding: utf-8 -*-
import time
from .sensor import Sensor
from random import randint


TIME_BETWEEN_METERINGS = 60


def meter_temp():
    value = randint(2000, 2500) / 100.0
    return value


def meter_bright():
    value = randint(80, 100)
    return value


def meter_humi():
    value = randint(80, 90)
    return value


def meter_pres():
    value = randint(900000, 980000) / 1000.0
    return value


temperature = Sensor('temperature', 'Wohnzimmer', 'grad_celsius', func=meter_temp)
brightness = Sensor('brightness', 'Wohnzimmer', 'lumen', func=meter_bright)
humidity = Sensor('humidity', 'Wohnzimmer', 'percent', func=meter_humi)
pressure = Sensor('pressure', 'Wohnzimmer', 'hectopascal', func=meter_pres)


def main():
    while True:
        temperature.meter_and_send()
        brightness.meter_and_send()
        humidity.meter_and_send()
        pressure.meter_and_send()
        time.sleep(TIME_BETWEEN_METERINGS)
