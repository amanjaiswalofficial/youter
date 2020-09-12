from flask import Flask
from flask_cors import CORS
from flask import request

from app.gateway import op_handler, socket_io
from app.sample_data import tweets

app = Flask(__name__)
socket_io.init_app(app)
CORS(app)


# operate on received tag
@app.route("/tag",  methods=['POST'])
def store_tag():
    tag = request.json.get("tag")
    token = request.json.get("token")
    # op_type = request.json.get("type")

    op_handler.map_tag_to_connection(token, tag)
    op_handler.start_listening(token, tag)
    op_handler.start_sending(token)

    return {
        "code": 200,
        "response": "success"
    }


# return all tweets
@app.route("/tweets")
def index():
    return {
        "code": 200,
        "response": tweets
    }
