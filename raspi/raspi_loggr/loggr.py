#!/usr/bin/env python
# -*- coding: utf-8 -*-

from sensor import Sensor

emu_sensor = Sensor('emu_sensor')

print("out: " + emu_sensor.get_measure())
