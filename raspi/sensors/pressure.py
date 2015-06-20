#!/usr/bin/env python
# -*- coding: utf-8 -*-
import Adafruit_BMP.BMP085 as BMP085


def meter():
    value = BMP085.BMP085(mode=BMP085.BMP085_ULTRAHIGHRES).read_pressure()
    value = value / 100.0
    return value
