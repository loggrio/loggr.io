#!/usr/bin/env python
# -*- coding: utf-8 -*-
import subprocess

PATH = 'sensors/'
SUFFIX = '.out'


class Sensor:
    """docstring for Sensor"""

    def __init__(self, sensorId, sensorName, location, sensorType):
        self.sensorId = sensorId
        self.sensorName = sensorName
        self.location = location
        self.sensorType = sensorType

    def get_metering(self):
        command = ["sudo", PATH + self.sensorType + SUFFIX]
        subproc = subprocess.Popen(command,
                                   stdout=subprocess.PIPE,
                                   stderr=subprocess.PIPE)
        return subproc.stdout.read()
