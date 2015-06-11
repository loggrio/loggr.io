from flask import Flask, request, jsonify
from os import path
from ConfigParser import ConfigParser
server = Flask(__name__)
config = ConfigParser()

HOME_DIR = path.expanduser("~")
CONFIG_FILE = HOME_DIR + '/.loggrrc'


@server.route('/', methods=['POST'])
def save_token():
    config.read(CONFIG_FILE)
    config.set('AUTH', 'token', request.json['token'])
    with open(CONFIG_FILE, 'w') as configfile:
        config.write(configfile)
    return jsonify(status='ok')


def init_config():
    if not path.isfile(CONFIG_FILE):
        config.add_section('AUTH')
        config.add_section('SENSORS')
        config.set('AUTH', 'token', '')
        with open(CONFIG_FILE, 'w') as configfile:
            config.write(configfile)

if __name__ == "__main__":
    init_config()
    server.run(debug=True)
