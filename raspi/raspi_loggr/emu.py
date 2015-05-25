#!/usr/bin/env python
# -*- coding: utf-8 -*-
from .sensor import Sensor

emu_sensor = Sensor('emu', 'emu-hausen', 'emu_sensor', 'grad_celsius')


def main():
    print emu_sensor.meter_and_send()
