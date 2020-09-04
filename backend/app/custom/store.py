import json
import redis


class Redis:

    def __init__(self, host, port, password):
        self.host = host
        self.port = port
        self.password = password
        self.db = r = redis.Redis(
            host=self.host,
            port=self.port,
            password=self.password
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
            value = item.decode()
            try:
                # if it can be converted into a dict, convert it
                value = json.loads(value)
            except json.decoder.JSONDecodeError:
                # pass it as it is, i.e. String
                pass
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
