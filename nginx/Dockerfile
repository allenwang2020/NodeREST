FROM ubuntu:14.04
MAINTAINER allen allenwang2020@gmail.com


RUN apt-get update
RUN apt-get install -y nginx

ADD conf/nginx.conf /etc/nginx/conf.d/nginx.conf

EXPOSE 80 443 
CMD ["nginx", "-g", "daemon off;"]