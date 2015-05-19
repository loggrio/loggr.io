#!/usr/bin/env python
# -*- coding: utf-8 -*-
import requests
import json

API = 'http://stkn.org:3002/api'
DB = 'meterings'

def send_data(json_dump):
  headers = {'Content-Type': 'application/json'}
  r = requests.post(API + "/" + DB, data=json_dump, headers=headers)
  return r.status_code

def generate_json_dump(userId, sensorType, time, value, unit):
  json_dump = {'userId': userId,
              'sensorType' : sensorType,
              'time' : time,
              'value' : value,
              'unit' : unit}
  return json.dumps(json_dump)
