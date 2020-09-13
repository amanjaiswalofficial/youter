FROM python:3.6-alpine

# install necessary packages
RUN set -x 										&&	\ 
	apk add --no-cache --virtual .build-deps 		\
	python3											\
	py-pip											\
	python-dev										\
	gcc												\
	g++												\
	py3-netifaces									\
	linux-headers			

COPY . /opt/
COPY app/ /opt/app/

WORKDIR /opt/

RUN pip3 install -r requirements.txt

EXPOSE 5000

ENV FLASK_APP run.py

CMD ["run", "--host=0.0.0.0", "--port=5000"]

ENTRYPOINT ["flask"]
