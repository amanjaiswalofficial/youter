# Gateway: to handle all the flow between everything, as in everything
import threading
import json
from tweepy import Stream, OAuthHandler, API


from app.custom.store import Redis, TagConnectionStore, TweetTagStore
from app.custom.twitter_listener import StreamListener
from app.custom.operation_handler import OperationHandler
from app.custom.logging import logger
from flask import request
from app.custom.logging import logger
from flask_socketio import SocketIO
# from app.gateway import tag_connection_store, redis

file_path = "../config2.json"

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
tweet_tag_store = TweetTagStore(store=redis,
                                fetch_count=50,
                                max_tweet_count=50)
tag_connection_store = TagConnectionStore(store=redis)


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

socket_io = SocketIO(cors_allowed_origins="*")


@socket_io.on("connect")
def start_new_thread():
    connection_id = request.sid
    tag_connection_store.add_connection_to_store(connection_id)
    logger.warning("New connection joined: {}".format(connection_id))
    socket_io.emit("finish_handshake", connection_id, connection_id)


@socket_io.on("disconnect")
def remove_new_thread():
    connection_id = request.sid
    tag_connection_store.remove_connection_from_store(connection_id)
    logger.warning("Connection left: {}".format(connection_id))


# Initializing operation handler to operate between tweets, tags and store
op_handler = OperationHandler(tag_connection_store=tag_connection_store,
                              tweet_tag_store=tweet_tag_store,
                              socket=socket_io,
                              api=api)
