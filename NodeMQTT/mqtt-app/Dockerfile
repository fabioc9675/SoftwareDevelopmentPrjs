FROM node:latest

WORKDIR /root/app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 1883

CMD ["npm", "start"]