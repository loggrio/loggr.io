#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify
from os import path
import re
import logging
from ConfigParser import ConfigParser
from flask.ext.cors import CORS
from raspi_loggr.util import set_status_led
from raspi_loggr.util import log_info
from raspi_loggr.util import log_error
from raspi_loggr.util import LedStatusTypes

server = Flask(__name__)
cors = CORS(server, allow_headers='Content-Type')

config = ConfigParser()

HOME_DIR = path.expanduser("~")
CONFIG_FILE = HOME_DIR + '/.loggrrc'


@server.route('/', methods=['POST'])
def save_token_and_userid():
    """Save token and user id in config file

    Returns:
        status (str): json status code
            error='format' or error='arguments" - if an error occured
            status='ok' - if everything was fine
    """
    config.read(CONFIG_FILE)

    regex_userid = re.compile(r'^[a-z,0-9]{24}$')
    regex_token = re.compile(r'^[A-Z,a-z,0-9]{64}$')

    if 'token' not in request.json and 'userid' not in request.json:
        log_error('missing arguments in post request')
        return jsonify(error='arguments')

    if 'token' in request.json:
        if regex_token.match(request.json['token']) is None:
            log_error('wrong format of token string')
            return jsonify(error='format')
        config.set('AUTH', 'token', request.json['token'])
        log_info('token set in config file')

    if 'userid' in request.json:
        if regex_userid.match(request.json['userid']) is None:
            log_error('wrong format of userid string')
            return jsonify(error='format')
        config.set('AUTH', 'userid', request.json['userid'])
        log_info('userid set in config file')

    with open(CONFIG_FILE, 'w') as configfile:
        config.write(configfile)
    set_status_led(LedStatusTypes.pairing_succeeded.name)
    return jsonify(status='ok')


def init_config():
    """Read existing config file or create a default one"""
    # If config file not exists create a default one
    if not path.isfile(CONFIG_FILE):
        log_info('No config file found, create default one')
        config.add_section('COMMON')
        config.add_section('AUTH')
        config.add_section('SENSORS')
        config.add_section('API')
        config.set('AUTH', 'token', '')
        config.set('AUTH', 'userid', '')
        config.set('API', 'url', 'http://loggr.stkn.org/api/')
        config.set('COMMON', 'scripts_path', 'sensors/')
        with open(CONFIG_FILE, 'w') as configfile:
            config.write(configfile)
        log_info('Created default config file')
        return

    config.read(CONFIG_FILE)

    if not config.has_section('AUTH'):
        config.add_section('AUTH')

    if not config.has_section('SENSORS'):
        config.add_section('SENSORS')

    if not config.has_option('AUTH', 'token'):
        config.set('AUTH', 'token', '')

    if not config.has_option('AUTH', 'userid'):
        config.set('AUTH', 'userid', '')

    with open(CONFIG_FILE, 'w') as configfile:
        config.write(configfile)


def main():
    """Main method of config server

    1. Start logging
    2. Start server
    """
    logging.basicConfig(format='%(asctime)s: %(levelname)s: %(message)s', filename='server.log', level=logging.INFO)
    init_config()
    server.run(host='0.0.0.0', debug=True)

if __name__ == "__main__":
    main()
