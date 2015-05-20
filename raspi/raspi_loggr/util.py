#!/usr/bin/env python
# -*- coding: utf-8 -*-
import requests
import json

API = 'http://stkn.org:3001/api'
DB = 'meterings'


def send_data(payload):
    headers = {'Content-Type': 'application/json'}
    r = requests.post(API + "/" + DB, data=json.dumps(payload), headers=headers)
    return r.status_code


def gen_payload(user_id, sensor_type, sensor_name, time, value, unit):
    payload = {'userId': user_id,
               'sensorType': sensor_type,
               'sensorName': sensor_name,
               'time': time,
               'value': value,
               'unit': unit}
    return payload
