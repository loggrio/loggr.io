#!/usr/bin/env python
# -*- coding: utf-8 -*-

import requests
import json

API = 'http://localhost:3000/api'
DB = 'meterings'

def sendData(payload):
  headers = {'Content-Type': 'application/json'}
  r = requests.post(API + "/" + DB, data=json.dumps(payload), headers=headers)
  return r.text
