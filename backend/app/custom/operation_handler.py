import threading
import time
from typing import AnyStr

from tweepy import Stream

from app.custom.twitter_listener import StreamListener
from app.custom.logging import logger


class OperationHandler:
    def __init__(self,
                 tag_connection_store,
                 tweet_tag_store,
                 socket,
                 api):
        self.tag_connection_store = tag_connection_store
        self.tweet_tag_store = tweet_tag_store
        self.socket_instance = socket
        self.api_obj = api

    def map_tag_to_connection(self,
                              connection_id: AnyStr,
                              tag: AnyStr) -> None:
        """
        Add value in cache, for a new connection, mapping it to a tag
        :param connection_id: String ID of connection (socket)
        :param tag: String for tag
        :return: None
        """
        self.tag_connection_store.add_or_update_connection(connection_id, tag)

    def stream_tweets_for_tag(self,
                              connection_id: AnyStr,
                              tag: AnyStr) -> None:
        """
        An infinite running method (thread) that will start a stream for
        receiving tweets on a particular tag and storing in cache.
        Ex - "Cricket" : [{}, {}, {}]
        Every 15 seconds, it checks if the tag still exists for this connection
        3 possible scenarios
        1. This tag still exists for this connection
        2. A new tag has com for the same connection
        3. This connection has left, so no more tag for this connection
        In 1, Do nothing, keep as is.
        In 2, Change the tag for stream_listener and restart a new Stream.
              Also delete the entries for previous tag
        In 3, Delete the entries for this tag as well and stop the thread
        :param connection_id: String ID for connection/socket
        :param tag: String for tag
        :return: None
        """
        stream_listener = StreamListener(tag=tag,
                                         tweet_tag_store=self.tweet_tag_store)
        stream = Stream(auth=self.api_obj.auth,
                        listener=stream_listener)
        stream.filter(track=[tag],
                      is_async=True)
        while True:
            logger.warning("{} receiving tweets on {}"
                           .format(connection_id, stream_listener.tag))
            time.sleep(15)  # sleep every 15 seconds
            new_tag = \
                self.tag_connection_store.get_tag_for_connection(connection_id)
            # case 1 and 2
            if new_tag:
                if new_tag != stream_listener.tag:  # case 2
                    self.tweet_tag_store.delete_tag(stream_listener.tag)
                    logger.\
                        warning("UPDATED, {} now receiving tweets on {}".
                                format(connection_id, new_tag))
                    stream.disconnect()
                    stream_listener.tag = new_tag
                    stream = Stream(auth=self.api_obj.auth,
                                    listener=stream_listener)
                    stream.filter(track=[new_tag], is_async=True)
                else:  # case 1
                    logger.warning("{} still receiving tweets on {}".
                                   format(connection_id, new_tag))
            else:
                # case 3
                self.tweet_tag_store.delete_tag(stream_listener.tag)
                logger.warning("DEAD, {} no more tweets on {}".
                               format(connection_id, stream_listener.tag))
                stream.disconnect()
                break

    def send_tweets_to_connection(self, connection_id: AnyStr) -> None:
        """
        This infinite method (thread) will take a connection_id and every
        15 seconds it will get the tag for this connection_id
        And then tweets for this tag, and emit them to the particular client
        differentiated by the connection_id and to them only
        If after 15 seconds, 2 possible cases
        1. The client is still there, with some tag. So fetch its tweets and
           return them to the particular client having the connection_id
        2. The client has left, hence no key/tag exist for that connection_id
           In that case stop the thread itself.
        :param connection_id: String ID for connection/socket
        :return: None
        """
        while True:
            time.sleep(15)
            tag = \
                self.tag_connection_store.get_tag_for_connection(connection_id)
            if tag:  # case 1
                tweets = self.tweet_tag_store.get_tweets_for_tag(tag)
                if tweets:
                    self.socket_instance.emit("new_tweets",
                                              {"tweets": tweets},
                                              connection_id)
            else:  # case 2
                break

    def start_listening(self, connection: AnyStr, tag: AnyStr) -> None:
        """
        Start a thread to continuously listen for a tag, store them to cache
        :param connection: String ID for connection/socket
        :param tag: String value for tag
        :return: None
        """
        thr = threading.Thread(target=self.stream_tweets_for_tag,
                               args=[connection, tag])
        thr.start()

    def start_sending(self, connection: AnyStr) -> None:
        """
        Start a thread to continuously send tweets to a connection based on the
        tag they are listening for.
        :param connection: String ID for connection/socket
        :return: None
        """
        thr = threading.Thread(target=self.send_tweets_to_connection,
                               args=[connection])
        thr.start()
