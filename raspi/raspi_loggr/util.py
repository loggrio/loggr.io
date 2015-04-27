#!/usr/bin/env python
# -*- coding: utf-8 -*-

import requests
import json

FIREBASE = 'https://loggrio.firebaseio.com'

def sendData(data):
  r = requests.post(FIREBASE + "/" + payload.get('type') + ".json", data=json.dumps(data))
  return r.status_code
