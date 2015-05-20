#!/usr/bin/env python
# -*- coding: utf-8 -*-
from datetime import datetime

from .sensor import Sensor
from .util import send_data
from .util import gen_payload
from .loggr import ValueUnits

emu_sensor = Sensor(999, 'emu', 'emu-hausen', 'emu_sensor')


def main():
    now = str(datetime.now())
    value = emu_sensor.get_metering()
    user_id = '99'

    payload = gen_payload(user_id, emu_sensor.sensor_type, emu_sensor.sensor_name, now, value,
                          ValueUnits.grad_celsius.name)

    print send_data(payload)
