#!/usr/bin/env python
# -*- coding: utf-8 -*-
import subprocess


def set_status_led(status_code):
    command = ['sensors/rgb.out', str(status_code)]
    subproc = subprocess.Popen(command,
                               stdout=subprocess.PIPE,
                               stderr=subprocess.PIPE)
