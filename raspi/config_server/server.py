from flask import Flask, request, jsonify, make_response
from os import path
import re
from ConfigParser import ConfigParser
from cors import crossdomain
server = Flask(__name__)
config = ConfigParser()

HOME_DIR = path.expanduser("~")
CONFIG_FILE = HOME_DIR + '/.loggrrc'


@server.route('/', methods=['POST', 'OPTIONS'])
@crossdomain(origin='*')
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
    if not path.isfile(CONFIG_FILE):
        config.add_section('AUTH')
        config.add_section('SENSORS')
        config.set('AUTH', 'token', '')
        config.set('AUTH', 'userid', '')
        with open(CONFIG_FILE, 'w') as configfile:
            config.write(configfile)

if __name__ == "__main__":
    init_config()
    server.run(host='0.0.0.0', debug=True)
