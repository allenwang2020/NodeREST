# Dockerizing MongoDB: Dockerfile for building MongoDB images
# Based on ubuntu:16.04, installs MongoDB following the instructions from:
# http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/

FROM       ubuntu:16.04
MAINTAINER Docker

# Installation:
# Import MongoDB public GPG key AND create a MongoDB list file
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN echo "deb http://repo.mongodb.org/apt/ubuntu $(cat /etc/lsb-release | grep DISTRIB_CODENAME | cut -d= -f2)/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list

# Update apt-get sources AND install MongoDB
RUN apt-get update && apt-get install -y mongodb-org

# Create the MongoDB data directory
RUN mkdir -p /data/db

# Expose port #27017 from the container to the host
EXPOSE 27017 8080

# Set /usr/bin/mongod as the dockerized entry-point application
ENTRYPOINT ["/usr/bin/mongod"]


# Dockerfile    
# 從 [Docker Hub](https://hub.docker.com/) 安裝 Node.js image。  
FROM node:4.4.2   
# 開放 container 的 8080 port  
# EXPOSE 8080
 # 設定 container 的預設目錄位置  
WORKDIR /NodeREST    
# 將專案根目錄的檔案加入至 container  
# 安裝 npm package  
ADD . /NodeREST  
RUN npm install    
CMD npm start