#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import json
import requests
from datetime import datetime

API = 'http://0.0.0.0:3000/api/'
CUSTOMERS = 'Customers/'
METERINGS = '/meterings'
SENSORS = '/sensors'
TOKEN = 'VeXCAfNHfUMk89oeX86jXOZAxCcnHwKGKhVCAwrv6GPHFKoUaRiX1w3Uj7OSyhrd'  # change for testing
USER_ID = '557f07349596fa9c0a8f9bcc'                                        # change for testing

# Sensor anlegen
headers = {'Content-Type': 'application/json', 'Authorization': TOKEN}
params = {'filter[where][type]': 'temperature', 'filter[where][location]': 'Testhaus'}
r = requests.get(API + CUSTOMERS + USER_ID + SENSORS, params=params, headers=headers)

if not len(r.json()):
    payload = {'type': 'temperature', 'location': 'Testhaus', 'unit': 'unit'}
    r = requests.post(API + CUSTOMERS + USER_ID + SENSORS, data=json.dumps(payload), headers=headers)
    id = r.json()['id']
    print r.json()['id']
else:
    id = r.json()[0]['id']
    print r.json()[0]['id']

value = 0
result = 0

while value < 10:
    # Daten senden
    payloads = {'sensorId': id, 'time': str(datetime.now()), 'value': value}
    params = {'filter[where][id]': id}
    r = requests.post(API + CUSTOMERS + USER_ID + METERINGS, data=json.dumps(payloads), params=params, headers=headers)
    # Daten holen
    params = {'filter[where][sensorId]': id, 'filter[where][value]': value}
    r = requests.get(API + CUSTOMERS + USER_ID + METERINGS, params=params, headers=headers)
    if len(r.json()):
        print r.json()[0]['value']
        if value == r.json()[0]['value']:
            print 'yeah right value'
        else:
            result = result + 1
    else:
        result = result + 1
    value = value + 1

print 'Test finished! Errors: ' + str(result)
