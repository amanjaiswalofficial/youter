from __future__ import absolute_import, print_function
import json
from typing import List, AnyStr, Dict

import redis


class Redis(object):
    def __init__(self, host, port, password) -> None:
        self.host = host
        self.port = port
        self.password = password
        self.db = r = redis.Redis(
            host=self.host,
            port=self.port,
            password=self.password
        )

    def ping_server(self) -> None:
        """
        Ping server to see if running correctly
        :return: None
        """
        return self.db.ping()

    def get_value_for_key(self, key: AnyStr) -> AnyStr:
        """
        Return a string value
        :param key:
        :return:
        """
        value = self.db.get(key)
        if value:
            value = value.decode()
        return value

    def get_list_for_key(self, key: AnyStr, count: int) -> List:
        """
        Return a list of values
        :param key:
        :param count:
        :return:
        """
        values = []
        for value in self.db.lrange(key, 0, count):
            item = value.decode()
            try:
                item = json.loads(item)
            except json.decoder.JSONDecodeError as jse:
                pass
            values.append(item)
        return values

    def set_value_for_key(self, key: AnyStr, value: AnyStr) -> None:
        """
        Set value for a key
        :param key:
        :param value:
        :return:
        """
        self.db.set(key, value)

    def update_list_for_key(self, key: AnyStr, value: [AnyStr, Dict]) -> None:
        """
        Set a list as value for a key
        :param key:
        :param value:
        :return:
        """
        value = json.dumps(value)
        self.db.lpush(key, value)

    def trim_list_for_key_by_count(self, key: AnyStr, count: int) -> None:
        """
        Shorten a list to size count
        :param key:
        :param count:
        :return:
        """
        self.db.ltrim(key, 0, count - 1)

    def trim_list_for_key_by_value(self, key: AnyStr, value: AnyStr) -> None:
        """
        Delete a value from a list
        :param key:
        :param value:
        :return:
        """
        self.db.lrem(key, 1, json.dumps(value))

    def delete_key(self, key: AnyStr) -> None:
        """
        Delete a key
        :param key:
        :return:
        """
        self.db.delete(key)


class TweetTagStore(object):
    def __init__(self, store, fetch_count, max_tweet_count):
        self.store = store
        self.tag_list_key = "available_tags_list",
        self.fetch_count = fetch_count
        self.max_tweet_count = max_tweet_count

    def push_tweet_for_tag(self, tag_key: AnyStr, tweet: Dict):
        """
        Push a tweet for a specific tag in the cache
        :param tag_key: String for the tag
        :param tweet: A dict for the tweet
        :return:
        """
        self.store.update_list_for_key(tag_key, tweet)

    def push_tweets_for_tag(self, tag_key: AnyStr, tweets: List) -> None:
        """
        Push a list of tweets in the cache for a given tag
        :param tag_key: String for the tag
        :param tweets: A list for tweets in dict format
        :return:
        """
        for tweet in tweets:
            self.push_tweet_for_tag(tag_key, tweet)

    def get_tweets_for_tag(self, tag_key: AnyStr) -> List:
        """
        Get a list of tweets for a specific key
        :param tag_key: String for the tag
        :return:
        """
        tweets = self.store.get_list_for_key(tag_key, self.fetch_count)
        self.store.delete_key(tag_key)
        return tweets

    def trim_tweets_for_tag(self, tag_key: AnyStr) -> None:
        """
        Reduce the number of tweets for a tag based on max_tweet_count
        :param tag_key: String for the tag
        :return: None
        """
        self.store.trim_list_for_key(tag_key, self.max_tweet_count)

    def add_tag_to_list(self, tag_name: AnyStr) -> None:
        """
        Add the tag to a list of tags, maintaining the total tags present
        :param tag_name: String for the tag
        :return: None
        """
        self.store.update_list_for_key(self.tag_list_key, tag_name)

    def delete_tag_from_list(self, tag_name):
        """
        Remove a tag from the list maintaining all the tags in the cache
        :param tag_name: String for the tag
        :return: None
        """
        self.store.trim_list_for_key_by_value(self.tag_list_key, tag_name)

    def delete_tag(self, tag_name):
        """
        Delete a particular tag from the cache
        :param tag_name: String for the tag
        :return: None
        """
        self.store.delete_key(tag_name)

    def add_tag(self, tag_name, value=None):
        """
        Add a tag to the ache
        :param tag_name: String for the tag
        :param value: Value to set the tag for
        :return: None
        """
        value = value if value else []
        self.store.set_value_for_key(tag_name, value)


class TagConnectionStore(object):
    def __init__(self, store):
        self.store = store
        self.connection_list_key = "available_connections_list"

    def add_connection_to_store(self, connection_id: AnyStr) -> None:
        """
        Add a new connection_id in the cache as key with no value
        :param connection_id: String for the connection_id
        :return: None
        """
        self.store.set_value_for_key(connection_id, "")

    def remove_connection_from_store(self, connection_id: AnyStr) -> None:
        """
        Delete a connection from the cache
        :param connection_id: String for the connection_id
        :return: None
        """
        self.store.delete_key(connection_id)

    def add_connection_to_list(self, connection_id):
        """
        Add a connection to the list of all present connections
        :param connection_id: String for the connection_id
        :return: None
        """
        self.store.update_list_for_key(self.connection_list_key,
                                       connection_id)

    def del_connection_from_list(self, connection_id: AnyStr) -> None:
        """
        Delete a connection from the list of all connections
        :param connection_id: String for the connection_id
        :return: None
        """
        self.store.trim_list_for_key_by_value(self.connection_list_key,
                                              connection_id)

    def add_or_update_connection(self, connection_id: AnyStr,
                                 tag_name: AnyStr):
        """
        Update value for a connection in the cache
        :param connection_id: String for the connection_id
        :param tag_name: Value for the connection_id to store in cache
        :return: None
        """
        value = tag_name if tag_name else ""
        self.store.set_value_for_key(connection_id, value)

    def get_tag_for_connection(self, connection_id: AnyStr) -> AnyStr:
        """
        Get the tag for a connection_id
        :param connection_id: String for the connection_id
        :return: String value as tag for the provided connection
        """
        return self.store.get_value_for_key(connection_id)

    def delete_connection(self, connection_id: AnyStr) -> None:
        """
        Delete a connection from the cache and its value
        :param connection_id: String for the connection_id
        :return: None
        """
        self.store.delete_key(connection_id)
