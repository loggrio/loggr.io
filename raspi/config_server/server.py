from flask import Flask, request, jsonify
from os import path
from ConfigParser import ConfigParser
server = Flask(__name__)
config = ConfigParser()

HOME_DIR = os.getenv("HOME")
CONFIG_FILE = HOME_DIR + '/.loggrrc'


@server.route('/', methods=['POST'])
def save_token():
    # TODO: config file exists?
    config.read(CONFIG_FILE)
    config.set('AUTH', 'token', request.json['token'])
    with open(CONFIG_FILE, 'w') as configfile:
        config.write(configfile)
    return jsonify(status='ok')

if __name__ == "__main__":
    server.run(debug=True)
