#!/usr/bin/env python

import Adafruit_BMP.BMP085 as BMP085
import sys

sensor = BMP085.BMP085(mode=BMP085.BMP085_ULTRAHIGHRES)

# print '{0:0.2f}'.format(sensor.read_pressure())
sys.stdout.write(str(sensor.read_pressure()))
