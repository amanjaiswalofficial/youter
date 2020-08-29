import json
import redis

class TweetStore:

    redis_host = "localhost"
    redis_port = 6379
    redis_password = ""

    redis_key = "tweets"
    num_tweets = 20

    def __init__(self):
        self.db = r = redis.Redis(
            host = self.redis_host,
            port = self.redis_port,
            password = self.redis_password
        )
        self.trim_count = 0

    def push(self, data):
        self.db.lpush(self.redis_key, json.dumps(data))
        self.trim_count += 1

        if self.trim_count > 100:
            self.db.ltrim(self.redis_key, 0, self.num_tweets)
            self.trim_count = 0

    def tweets(self, tweet=15):
        tweets = []

        for item in self.db.lrange(self.redis_key, 0, limit-1):
            tweet_obj = json.loads(item)
            tweets.append(tweet_obj)
        

        return tweets