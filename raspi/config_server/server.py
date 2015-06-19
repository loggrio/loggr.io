from flask import Flask, request, jsonify
from os import path
import re
from ConfigParser import ConfigParser
from flask.ext.cors import CORS
server = Flask(__name__)
config = ConfigParser()

HOME_DIR = path.expanduser("~")
CONFIG_FILE = HOME_DIR + '/.loggrrc'

CORS(server, methods=['POST'], allow_headers='Content-Type')


@server.route('/', methods=['POST'])
def save_token_and_userid():
    config.read(CONFIG_FILE)

    regex_userid = re.compile(r'^[a-z,0-9]{24}$')
    regex_token = re.compile(r'^[A-Z,a-z,0-9]{64}$')

    if 'token' not in request.json and 'userid' not in request.json:
        return jsonify(error='arguments')

    if 'token' in request.json:
        if regex_token.match(request.json['token']) is None:
            return jsonify(error='format')
        config.set('AUTH', 'token', request.json['token'])

    if 'userid' in request.json:
        if regex_userid.match(request.json['userid']) is None:
            return jsonify(error='format')
        config.set('AUTH', 'userid', request.json['userid'])

    with open(CONFIG_FILE, 'w') as configfile:
        config.write(configfile)
    return jsonify(status='ok')


def init_config():
    # If config file not exists create a default one
    if not path.isfile(CONFIG_FILE):
        config.add_section('AUTH')
        config.add_section('SENSORS')
        config.set('AUTH', 'token', '')
        config.set('AUTH', 'userid', '')
        with open(CONFIG_FILE, 'w') as configfile:
            config.write(configfile)

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

if __name__ == "__main__":
    init_config()
    server.run(host='0.0.0.0', debug=True)
