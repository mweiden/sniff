FROM python:3-alpine

# Copy the server code and install its dependencies
WORKDIR /usr/src/app
COPY server/requirements.txt ./
RUN pip install -r requirements.txt
COPY server .

# Configure wsgiuser
RUN addgroup uwsgiuser
RUN adduser -S -H -G uwsgiuser uwsgiuser
RUN chown -R uwsgiuser:uwsgiuser /usr/src/app

EXPOSE 5000

CMD uwsgi --ini uwsgi.ini --uid uwsgiuser