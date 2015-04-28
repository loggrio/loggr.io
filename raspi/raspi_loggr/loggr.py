#!/usr/bin/env python
# -*- coding: utf-8 -*-
from datetime import datetime

from .sensor import Sensor
from .util import sendData


emu_sensor = Sensor('emu_sensor')

def main():
  now = str(datetime.now())
  value = emu_sensor.get_metering()
  sensor_type = 'emu_temp'

  payload = {'userId': '1',
              'sensorType' : sensor_type,
              'time' : now,
              'value' : value}

  print sendData(payload)
