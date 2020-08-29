from flask import Flask
from tweet_store import tweet_store

app = Flask(__name__)
store = TweetStore()

@app.route("/")
def index():
    tweets = store.tweets()
    return tweets

if __name__ == "__main__":
    app.run(debug=True)