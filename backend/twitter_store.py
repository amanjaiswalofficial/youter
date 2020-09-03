from __future__ import absolute_import, print_function

import tweepy
import datetime
import json
from textblob import TextBlob
from store_setup import tweet_store, tag_store, get_tags

topics_to_see = ["#edm", "@Skrillex", "@Madeon", "@Zedd", "#porterrobinson"]

file_path = "../config.json"

with open(file_path) as f:
	twitter_api = json.loads(f.read())


consumer_key = twitter_api["consumer_key"]
consumer_secret = twitter_api["consumer_secret"]
access_token = twitter_api["access_token"]
access_token_secret = twitter_api["access_token_secret"]

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)


class StreamListener(tweepy.StreamListener):

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
			tweet_store.push(tweet_item)
			print(tweet_item)

	def on_status(self, status_code):
		if status_code == 420:
			return False

	def on_error(self, status_code):
		print(status_code)
		return False


stream_listener = StreamListener()
stream = tweepy.Stream(auth=api.auth, listener=stream_listener)

stream.filter(track=get_tags())

"""
while True:
	if twitterStream.running is True:
		twitterStream.disconnect()
	keywords=getKeywordsFromDb()
	if keywords=='':
		print 'no keywords to listen to'
	else:
	twitterStream.filter(track=[keywords],async=True)
	time.sleep(3600) # sleep for one hour
"""
