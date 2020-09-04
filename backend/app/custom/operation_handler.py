from typing import List, AnyStr
import time

from .logging import logger


class OperationHandler:
    def __init__(self, twitter_stream, cycle_in_sec, tag_store, tweet_store):
        """
        Initialize a tweepy stream object and cycle frequency for thread
        :param twitter_stream: Tweepy stream object to fetch tweets
        :param cycle_in_sec: Check for reset every n seconds
        :param tag_store: Store instance to save and fetch tags
        :param tweet_store: Store instance to fetch tweets
        """
        self.reset = False
        self.stream = twitter_stream
        self.tag_store = tag_store
        self.tweet_store = tweet_store
        self.cycle_frequency = cycle_in_sec

    def get_all_tags(self) -> List:
        """
        Get all tags from the cache
        :return: List of all tags (including hashtags and usernames)
        """
        return self.tag_store.get()

    def get_all_tweets(self) -> List:
        return self.tweet_store.get()

    def reset_stream(self) -> None:
        """
        Enable reset to restart stream with new tags
        :return: None
        """
        self.reset = True

    def start_stream(self) -> None:
        """
        Start listening to twitter stream and update cache for matched tweets
        :return: None
        """
        self.stream.filter(track=[self.get_all_tags()[0]],
                           is_async=True)

    def operate_tag(self, op_type, tag) -> AnyStr:
        """
        Handle tag operations, either it is to add a tag or remove a tag
        :param op_type: Type of operation to call, either add or remove
        :param tag: Word to operate with
        :return: String as response of operation
        """
        if op_type == "add":
            return self._add_tag(tag)
        if op_type == "remove":
            return self._remove_tag(tag)
        return "Failure, incorrect operation type"

    def _add_tag(self, tag: AnyStr) -> AnyStr:
        """
        Add received word in the cache
        :param tag: String containing tag/username
        :return: None
        """
        self.tag_store.push(tag)
        self.reset_stream()
        return "Success"

    def _remove_tag(self, tag: AnyStr) -> AnyStr:
        """
        Remove the word from the cache
        :param tag: Word to be removed from cache
        :return: None
        """
        logger.info("Tag Removed: {}".format(tag))
        self.reset_stream()
        return "Success"

    def handle_twitter_stream(self) -> None:
        """
        After cycle_frequency no. of seconds, check if reset is True, meaning
        the tags have been updated either by addition or deletion
        So disconnect the stream and start a new one
        :return: None
        """
        while True:
            time.sleep(self.cycle_frequency)
            if not self.stream.running:
                self.start_stream()
            else:
                if self.reset:
                    logger.warning("Disconnecting and restarting in {}"
                                   .format(self.cycle_frequency))
                    self.stream.disconnect()
                    self.reset = False
