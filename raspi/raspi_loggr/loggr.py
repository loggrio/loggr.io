#!/usr/bin/env python
# -*- coding: utf-8 -*-

from .sensor import Sensor
import requests
import json
import time

emu_sensor = Sensor('emu_sensor')

FIREBASE = 'https://loggrio.firebaseio.com'

def main():
  curTime = str(time.time())
  value = emu_sensor.get_measure()
  sensor_type = 'emu_temp'
  payload = {'type' : sensor_type, 'time' : curTime, 'value' : value}

  print sendData(payload)


def sendData(payload):
  r = requests.post(FIREBASE + "/" + payload.get('type') + ".json", data=json.dumps(payload))
  return r.status_code


if __name__ == "__main__":
    main()
