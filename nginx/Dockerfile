#dockerfile for nginx
FROM nginx

# Adding the configuration files
ADD conf/nginx.conf /etc/nginx

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
