import json
import redis


class RedisStore:
    redis_host = "localhost"
    redis_port = 6379
    redis_password = ""

    def __init__(self):
        self.db = r = redis.Redis(
            host=self.redis_host,
            port=self.redis_port,
            password=self.redis_password
        )
        self.count = 0

    def check_count(self, key, max_count):
        if self.count > max_count:
            print("Deleting tweets")
            self.db.ltrim(key, 0, max_count - 1)
            self.count = 0

    def push(self, key, value):
        if not isinstance(value, str):
            value = json.dumps(value)
        self.db.lpush(key, value)
        self.count += 1

    def get_data(self, key, amount):
        items = []
        for item in self.db.lrange(key, 0, amount - 1):
            if isinstance(item, bytes):
                value = item.decode()
            else:
                value = json.loads(item)
            items.append(value)
        return items


class Store:
    def __init__(self, store_instance, per_fetch_count, key, max_count):
        self.store = store_instance
        self.key = key
        self.max_count = max_count
        self.per_fetch_count = per_fetch_count

    def push(self, item):
        self.store.push(self.key, item)
        self.store.check_count(self.key, self.max_count)

    def get(self):
        return self.store.get_data(self.key, self.per_fetch_count)


redis_store = RedisStore()

tweet_store = Store(store_instance=redis_store,
                    key="tweets",
                    per_fetch_count=10,
                    max_count=15)
tag_store = Store(store_instance=redis_store,
                  key="tags",
                  per_fetch_count=25,
                  max_count=25)

