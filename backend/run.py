from flask import Flask, request
from app.gateway import op_handler, stream_handler
from app.sockets import socket_io
from flask_cors import CORS
from flask import request

app = Flask(__name__)
socket_io.init_app(app)
CORS(app)


# operate on received tag
@app.route("/tag",  methods=['POST'])
def store_tag():
    tag = request.json.get("tag")
    op_type = request.json.get("type")
    response = op_handler.operate_tag(op_type=op_type, tag=tag)
    return {
        "code": 200,
        "response": response
    }


# return all tweets
@app.route("/tweets")
def index():
    tweets = op_handler.get_all_tweets()
    return {
        "code": 200,
        "response": tweets
    }


if __name__ == "__main__":
    stream_handler.start()
    socket_io.run(app, use_reloader=False)
