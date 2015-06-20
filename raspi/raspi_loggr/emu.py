#!/usr/bin/env python
# -*- coding: utf-8 -*-
from .sensor import Sensor


def meter_temp():
    pass

def meter_bright():
    pass

def meter_humi():
    pass

def meter_pres():
    pass


temp = Sensor('temperature', 'WOZI', 'grad', func=meter_temp)
temp = Sensor('brightness', 'WOZI', 'lumen', func=meter_bright)
temp = Sensor('humidity', 'WOZI', 'percent', func=meter_humi)
temp = Sensor('pressure', 'WOZI', 'hectopascal', func=meter_pres)


def main():
    print emu_sensor.meter_and_send()
