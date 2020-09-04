# Youter
Youter (your personal twitter) is a python+redis+react application that allows you to create your own version of twitter. And read about items that you care about.

## How to get started

Setup virtual environment and install required libraries.

```virtualenv venv -p python3.6```
```pip install -r requirements.txt```

Create an app on [Twitter for developers](https://developer.twitter.com/en/portal/dashboard) and obtain
>API KEY

>API SECRET

>ACCESS KEY

>ACCESS SECRET

Also setup redis and update its configurations like:

>REDIS HOST

>REDIS PORT

>REDIS PASSWORD

Update ```config.json``` with these values

## Personalize twitter

After the app is authenticated via the twitter server based on credentials

Run with

```cd backend```

```python3 run.py```