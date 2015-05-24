#!/usr/bin/env python
# -*- coding: utf-8 -*-
import subprocess
from enum import Enum


class LedStatusTypes(Enum):
    ok = 1
    client_error = 2
    server_error = 3


def set_status_led(status):
    command = ['sensors/rgb.out', str(status)]
    subproc = subprocess.Popen(command,
                               stdout=subprocess.PIPE,
                               stderr=subprocess.PIPE)
