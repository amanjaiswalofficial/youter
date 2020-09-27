# Youter
Youter (your twitter) is a flask+react+redis application that allows you to create your own version of twitter. And read about items that you care about.

## How it works

After setting up twitter developer API access and redis, Youter provides with a search bar to enter the term 
(Ex - **Cricket**, **#Food**, **@skrillex**)

Once running successfully, it will return tweets based on the search term and update feed every 15 seconds.

## How to get started

Create an app on [Twitter for developers](https://developer.twitter.com/en/portal/dashboard) and obtain

>consumer_key

>consumer_secret

>access_token

>access_token_secret

Also update values for redis in docker:

>redis_host

>redis_port

>redis_password

Update ```docker-compose.yaml``` with these values


### Updating environment variables for frontend application

Edit ```frontend/.env``` with required variables to run the application before building image via.

```docker-compose build```

Current *BACKNEND_URL*=*"http://127.0.0.1:5000"*

## Personalize twitter

After the ```docker-compose.yaml``` file is updated with config values and images built.

Run with

```docker-compose up -d```