#!/usr/bin/env python
# -*- coding: utf-8 -*-

from .sensor import Sensor
from .util import sendData

from datetime import datetime

emu_sensor = Sensor('emu_sensor')


def main():
  curTime = str(datetime.now())
  value = emu_sensor.get_metering()
  sensor_type = 'emu_temp'

  payload = {'userId': '1',
          'sensorType' : sensor_type,
          'time' : curTime,
          'value' : value}

  print sendData(payload)


if __name__ == "__main__":
    main()
