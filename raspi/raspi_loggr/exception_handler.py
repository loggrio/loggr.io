#!/usr/bin/env python
# -*- coding: utf-8 -*-
import logging


class SensorScriptException(Exception):
    def __init__(self, cpe):
        self.rc = str(cpe.returncode)
        self.output = str(cpe.output)
        self.cmd = str(cpe.cmd[0])

    def logErrors(self):
        # 1 = catch wiringPi errors
        # 2 = catch open device file errors of mounted devices
        # 3 = catch read errors on devices
        logging.error('called process error: ' + self.cmd + ' returned ' + self.rc + ': ' + self.output)
        print 'called process error: ' + self.cmd + ' returned ' + self.rc + ': ' + self.output


class LedException(Exception):
    def __init__(self, le):
        self.rc = le.returncode
        self.cmd = str(le.cmd[0])

    def logErrors(self):
        if self.rc == 1:
            # catch wiringPi errors
            logging.error('called process error: ' + self.cmd + ' returned 1: setup wiringPi failed')
            print 'called process error: ' + self.cmd + ' returned 1: setup wiringPi failed'
        elif self.rc == 4:
            # catch invalid arguments errors
            logging.error('called process error: ' + self.cmd + ' returned 1: invalid arguments')
            print 'called process error: ' + self.cmd + ' returned 1: invalid arguments'
