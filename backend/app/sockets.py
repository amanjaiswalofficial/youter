import threading
import time
from flask import request
from flask_socketio import SocketIO
from .gateway import tweet_store, op_handler
from datetime import datetime

socket_io = SocketIO(cors_allowed_origins="*")


def send_tweets_async(room_id, socket_instance,
                      msg, data, cycle_in_freq):
    while True:
        last_tweet_time_before_sleep = \
            datetime.strptime(tweet_store.get_key("last_tweet").decode(), "%Y-%m-%d %H:%M:%S")
        time.sleep(cycle_in_freq)
        last_tweet_time_after_sleep = \
            datetime.strptime(tweet_store.get_key("last_tweet").decode(), "%Y-%m-%d %H:%M:%S")
        if last_tweet_time_after_sleep != last_tweet_time_before_sleep:
            new_tweets = op_handler.get_all_tweets()
            socket_instance.emit(msg, {"tweets": new_tweets}, room=room_id)


@socket_io.on("connect")
def enable_thread():
    current_client = request.sid
    tweet_socket_handler = \
        threading.Thread(target=send_tweets_async,
                         kwargs={"room_id": current_client,
                                 "socket_instance": socket_io,
                                 "msg": "new_tweets",
                                 "data": {"data": "Running Now"},
                                 "cycle_in_freq": 10})
    tweet_socket_handler.start()
