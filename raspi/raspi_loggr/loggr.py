#!/usr/bin/env python
# -*- coding: utf-8 -*-
import time
from enum import Enum
from datetime import datetime

from .sensor import Sensor
from .util import send_data
from .util import gen_payload
from .util import set_status_led

class SensorTypes(Enum):
    temperature = 1
    brightness = 2
    humidity = 3
    volume = 4


class ValueUnits(Enum):
    grad_celsius = 1
    grad_fahrenheit = 2
    percent = 3
    lumen = 4
    decibel = 5


# emu_sensor = Sensor('emu_sensor')
temperature = Sensor('0', 'tempSensor1', 'exampleRoom', SensorTypes.temperature.name)
brightness = Sensor('1', 'brightSensor1', 'exampleRoom', SensorTypes.brightness.name)
humidity = Sensor('2', 'humidSensor1', 'exampleRoom', SensorTypes.humidity.name)
# volume = Sensor('3', 'volSensor1', 'exampleRoom', SensorTypes.volume.name)

TIME_BETWEEN_METERINGS = 60


def main():

    # TODO: uniqe userId management
    userId = '1'

    while (True):
        # get metering from temperature sensor
        value_temp = temperature.get_metering()
        now = str(datetime.now())
        payload_temp = gen_payload(userId, temperature.sensor_type, temperature.sensor_name, now, value_temp,
                                   ValueUnits.grad_celsius.name)

        # get metering from brightness sensor
        value_bright = brightness.get_metering()
        now = str(datetime.now())
        payload_bright = gen_payload(userId, brightness.sensor_type, brightness.sensor_name, now, value_bright,
                                     ValueUnits.lumen.name)

        # get metering from humidity sensor
        value_humid = humidity.get_metering()
        now = str(datetime.now())
        payload_humid = gen_payload(userId, humidity.sensor_type, humidity.sensor_name, now, value_humid,
                                    ValueUnits.percent.name)

        # get metering from volume sensor
        # value_vol = volume.get_metering()
        # payload_vol = gen_payload(userId, volume.sensor_type, volume.sensor_name, now, value_vol,
        #                           ValueUnits.decibel.name)

        ret1 = send_data(payload_temp)
        ret2 = send_data(payload_bright)
        ret3 = send_data(payload_humid)
        # ret4 = send_data(payload_vol)

        if ret1 == 200 and ret2 == 200 and ret3 == 200:
            set_status_led(200)
        else:
            set_status_led(400)


        time.sleep(TIME_BETWEEN_METERINGS)
