#Dockerfile    
# 從 [Docker Hub](https://hub.docker.com/) 安裝 Node.js image。  
FROM node:4.4.2   
# 開放 container 的 8080 port  
EXPOSE 8080
 # 設定 container 的預設目錄位置  
WORKDIR /NodeREST    
# 將專案根目錄的檔案加入至 container  
# 安裝 npm package  
ADD . /NodeREST  
RUN npm install
CMD npm start

