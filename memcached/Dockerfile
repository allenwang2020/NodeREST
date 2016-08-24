############################################################
# Dockerfile to run Memcached Containers
# Based on Ubuntu Image
############################################################

# Set the base image to use to Ubuntu
FROM ubuntu:14.04

# Set the file maintainer (your name - the file's author)
MAINTAINER allen wang <allenwang2020@gmail.com> 

# Install Memcached
RUN apt-get update
RUN apt-get install -y memcached

# Port to expose (default: 11211)
EXPOSE 11211

# Set the user to run Memcached daemon
USER daemon

# Set the entrypoint to memcached binary
ENTRYPOINT memcached

# Default Memcached run command arguments
CMD ["-m", "128"]