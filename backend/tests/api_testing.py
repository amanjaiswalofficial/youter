import json

from app.sample_data import tweets


class TestTweets:
    def test_get_tweets_ok(self, test_client):
        """
        Test get tweets API
        :param test_client:
        :return:
        """
        response = test_client.get("/tweets")
        data = json.loads(response.data.decode())

        assert response.status_code == 200
        assert data["code"] == 200
        assert data["response"] == tweets
