from flask import Flask, request, jsonify
server = Flask(__name__)

@server.route('/', methods=['POST'])
def get_token():
    print request.json
    return jsonify(status='ok')

if __name__ == "__main__":
    server.run(debug=True)
