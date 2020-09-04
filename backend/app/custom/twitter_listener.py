from __future__ import absolute_import, print_function

import tweepy
import datetime
import json
from textblob import TextBlob


class StreamListener(tweepy.StreamListener):

	def __init__(self, tweet_store):
		super().__init__()
		self.store = tweet_store

	def on_data(self, data):
		tweet = json.loads(data)
		if "RT @" not in tweet['text']:

			blob = TextBlob(tweet['text'])
			sent = blob.sentiment
			polarity = sent.polarity
			subjectivity = sent.subjectivity

			tweet_item = {
				"id_str": tweet['id_str'],
				"text": tweet['text'],
				"username": tweet['user']['screen_name'],
				"name": tweet['user']['name'],
				"profile_image_url": tweet['user']['profile_image_url'],
				"polarity": polarity,
				"subjectivity": subjectivity,
				"received_at":
					datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
				}
			self.store.push(tweet_item)
			print(tweet_item["text"])

	def on_status(self, status_code):
		if status_code == 420:
			return status_code

	def on_error(self, status_code):
		if status_code == 420:
			return status_code
