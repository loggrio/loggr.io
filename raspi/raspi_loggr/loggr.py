#!/usr/bin/env python
# -*- coding: utf-8 -*-

from .sensor import Sensor
from .util import sendData

import time

emu_sensor = Sensor('emu_sensor')

def main():
  curTime = str(time.time())
  value = emu_sensor.get_metering()
  sensor_type = 'emu_temp'
  data = {'type' : sensor_type, 'time' : curTime, 'value' : value}

  print sendData(data)


if __name__ == "__main__":
    main()
