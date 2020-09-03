from flask import Flask, request
from store_setup import tag_store, tweet_store
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# operate on received tag
@app.route("/tag",  methods=['POST'])
def store_tag():
    if request.json.get("type") == "add":
        tag = request.json.get("tag")
        tag_store.push(tag)
        return {
            "Tag received": tag
        }
    elif request.json.get("type") == "remove":
        return {
            "Tag removed": request.json.get("tag")
        }


# return all tweets
@app.route("/")
def index():
    tweets = tweet_store.get()
    return {
        "tweets": tweets
    }


if __name__ == "__main__":
    app.run(debug=True)
