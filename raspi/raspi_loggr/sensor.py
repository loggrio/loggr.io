#!/usr/bin/env python
# -*- coding: utf-8 -*-
import subprocess

PATH = 'sensors/'
SUFFIX = '.out'

class Sensor:
  """docstring for Sensor"""

  def __init__(self, name):
    self.name = name

  def get_metering(self):
    sensor = subprocess.Popen(PATH + self.name + SUFFIX,
                                stdout=subprocess.PIPE,
                                stderr=subprocess.PIPE)
    return sensor.stdout.read()
