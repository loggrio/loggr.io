#!/usr/bin/env python
# -*- coding: utf-8 -*-
import subprocess
import logging

PATH = 'sensors/'
SUFFIX = '.out'


class Sensor:
    """docstring for Sensor"""

    def __init__(self, sensor_id, sensor_name, location, sensor_type):
        self.sensor_id = sensor_id
        self.sensor_name = sensor_name
        self.location = location
        self.sensor_type = sensor_type

    def get_metering(self):
        command = PATH + self.sensor_type + SUFFIX
        subproc = subprocess.Popen(command,
                                   stdout=subprocess.PIPE,
                                   stderr=subprocess.PIPE)

        sout = subproc.stdout.read()
        serr = subproc.stderr.read()

        subproc.wait()
        logging.info('metering of ' + self.sensor_type + ' sensor, returncode: ' + str(subproc.returncode))

        return sout if len(sout) else serr
