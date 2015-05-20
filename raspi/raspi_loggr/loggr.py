#!/usr/bin/env python
# -*- coding: utf-8 -*-
import time
from enum import Enum
from datetime import datetime

from .sensor import Sensor
from .util import send_data
from .util import generate_json_dump


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
            temp_dump = generate_json_dump(userId, temperature.sensorType, temperature.sensorName, now, value_temp,
                                           ValueUnits.grad_celsius.name)

            # get metering from brightness sensor
            value_bright = brightness.get_metering()
            now = str(datetime.now())
            bright_dump = generate_json_dump(userId, brightness.sensorType, brightness.sensorName, now, value_bright,
                                             ValueUnits.lumen.name)

            # get metering from humidity sensor
            value_humid = humidity.get_metering()
            now = str(datetime.now())
            humid_dump = generate_json_dump(userId, humidity.sensorType, humidity.sensorName, now, value_humid,
                                            ValueUnits.percent.name)

            # get metering from volume sensor
            # value_vol = volume.get_metering()
            # vol_dump = generate_json_dump(userId, volume.sensorType, volume.sensorName, now, value_vol,
            #                               ValueUnits.decibel.name)

            print send_data(temp_dump)
            print send_data(bright_dump)
            print send_data(humid_dump)
            # print send_data(vol_dump)

            time.sleep(TIME_BETWEEN_METERINGS)
