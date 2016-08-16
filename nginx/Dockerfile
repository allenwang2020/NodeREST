FROM ubuntu:14.04
MAINTAINER saymagic saymagic@163.com

ADD conf/nginx.conf /etc/nginx/nginx.conf

RUN apt-get update
RUN apt-get install -y nginx

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]