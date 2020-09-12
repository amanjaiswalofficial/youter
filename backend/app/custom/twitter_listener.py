from __future__ import absolute_import, print_function

from typing import AnyStr

import tweepy
import datetime
import json
from textblob import TextBlob


class StreamListener(tweepy.StreamListener):

	def __init__(self, tag, tweet_tag_store):
		super().__init__()
		self.tweet_tag_store = tweet_tag_store
		self.tag = tag

	def on_data(self, data: AnyStr) -> None:
		"""
		On receiving some data as a tweet, store it in cache for a given tag
		:param data: A string of data for the tweet
		:return: None
		"""
		tweet = json.loads(data)
		if "RT @" not in tweet['text']:

			blob = TextBlob(tweet['text'])
			sent = blob.sentiment
			polarity = sent.polarity
			subjectivity = sent.subjectivity

			received_time = \
				datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
			tweet_item = {
				"id_str": tweet['id_str'],
				"text": tweet['text'],
				"username": tweet['user']['screen_name'],
				"name": tweet['user']['name'],
				"profile_image_url": tweet['user']['profile_image_url'],
				"polarity": polarity,
				"subjectivity": subjectivity,
				"received_at": received_time
				}
			self.tweet_tag_store.push_tweet_for_tag(self.tag, tweet_item)

	def on_status(self, status_code: int) -> int:
		"""
		In case of status_code received, return it
		:param status_code: Integer value for the status code
		:return: Returning integer value for the status code
		"""
		if status_code == 420:
			return status_code

	def on_error(self, status_code: int) -> int:
		"""
		In case of error return the status_code
		:param status_code:
		:return: Return integer value for the status code
		"""
		if status_code == 420:
			return status_code
