#!/usr/bin/env python
# -*- coding: utf-8 -*-

from Adafruit_CharLCD import Adafruit_CharLCD
from subprocess import *
from time import sleep, strftime
from datetime import datetime

lcd = Adafruit_CharLCD()

cmd_eth = "ip addr show eth0 | grep inet | awk '{print $2}' | cut -d/ -f1"
cmd_wlan = "ip addr show wlan0 | grep inet | awk '{print $2}' | cut -d/ -f1"

lcd.begin(16, 1)


def run_cmd(cmd):
    p = Popen(cmd, shell=True, stdout=PIPE)
    output = p.communicate()[0]
    return output

while True:
    not_connected = False
    lcd.clear()
    lcd.message(datetime.now().strftime('%b %d  %H:%M:%S\n'))
    ipaddr = run_cmd(cmd_eth)
    if len(ipaddr) <= 1:
        ipaddr = run_cmd(cmd_wlan)
        if len(ipaddr) <= 1:
            not_connected = True

    if not_connected is True:
        lcd.message('No IP available!')
    elif len(ipaddr) > 14:
        lcd.message('%s' % (ipaddr))
    else:
        lcd.message('IP %s' % (ipaddr))
    sleep(5)
    lcd.clear()
    lcd.message('Webapp:\nloggr.stkn.org')
    sleep(5)
