#!/usr/bin/env python
# -*- coding: utf-8 -*-
import subprocess
import logging
from enum import Enum


class LedStatusTypes(Enum):
    ok = 1
    client_error = 2
    server_error = 3


def set_status_led(status):
    command = ['sensors/rgb.out', str(status)]
    try:
        subproc = subprocess.check_call(command,
                                        stdout=subprocess.PIPE,
                                        stderr=subprocess.PIPE)
    except subprocess.CalledProcessError, cpe:
        if cpe.returncode == 1:
            logging.error('called process error: ' + str(cpe.cmd[0]) + ' returned 1: invalid arguments')
            print 'called process error: ' + str(cpe.cmd[0]) + ' returned 1: invalid arguments'
        elif cpe.returncode == 2:
            logging.error('called process error: ' + str(cpe.cmd[0]) + ' returned 2: setup wiringPi failed')
            print 'called process error: ' + str(cpe.cmd[0]) + ' returned 2: setup wiringPi failed'
    except OSError, ose:
        logging.error('oserror: ' + str(ose.strerror))
        print 'oserror: ' + str(ose.strerror)
