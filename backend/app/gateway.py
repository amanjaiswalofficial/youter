# Gateway: to handle all the flow between everything, as in everything
import threading
import json
from tweepy import Stream, OAuthHandler, API


from app.custom.store import Redis, Store
from app.custom.twitter_listener import StreamListener
from app.custom.operation_handler import OperationHandler
from app.custom.logging import logger

file_path = "../config.json"

try:
    with open(file_path) as f:
        config = json.loads(f.read())
except FileNotFoundError:
    logger.error("Unable to read config file, please ensure path")

# Setting up Redis and required Stores to save tweets and tags
host = config.get("redis_host")
port = config.get("redis_port")
password = config.get("redis_password")

if any([host is None, port is None, password is None]):
    raise KeyError("Incorrect config for Redis, update config file")

redis = Redis(host=host, port=port, password=password)
tweet_store = Store(store_instance=redis, key="tweets",
                    per_fetch_count=10, max_count=15)
tag_store = Store(store_instance=redis, key="tags",
                  per_fetch_count=25, max_count=25)


# Setting up Twitter streamer with StreamListener
consumer_key = config.get("consumer_key")
consumer_secret = config.get("consumer_secret")
access_token = config.get("access_token")
access_token_secret = config.get("access_token_secret")

if (any([consumer_key is None, consumer_secret is None,
         access_token is None, access_token_secret is None])):
    raise KeyError("Incorrect config for Tweepy Streamer, update config file")

auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = API(auth)

stream_listener = StreamListener(tweet_store=tweet_store)
stream = Stream(auth=api.auth, listener=stream_listener)

# Initializing operation handler to operate between tweets, tags and store
op_handler = OperationHandler(twitter_stream=stream,
                              cycle_in_sec=10,
                              tweet_store=tweet_store,
                              tag_store=tag_store)


stream_handler = threading.Thread(target=op_handler.handle_twitter_stream)
# socket_handler = threading.Thread(target=socket.socket_stream_handler)
