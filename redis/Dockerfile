FROM        ubuntu:14.04
RUN         apt-get update && apt-get install -y redis-server
EXPOSE      6378
ENTRYPOINT  ["/usr/bin/redis-server"]