from flask import Flask, request
from app.gateway import op_handler, stream_handler
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# operate on received tag
@app.route("/tag",  methods=['POST'])
def store_tag():
    tag = request.json.get("tag")
    op_type = request.json.get("type")

    response = op_handler.operate_tag(op_type=op_type, tag=tag)
    return {
        "code": 200,
        "status": response
    }


# return all tweets
@app.route("/tweets")
def index():
    tweets = op_handler.get_all_tweets()
    return {
        "tweets": tweets
    }


if __name__ == "__main__":
    stream_handler.start()
    app.run(debug=True, use_reloader=False)
