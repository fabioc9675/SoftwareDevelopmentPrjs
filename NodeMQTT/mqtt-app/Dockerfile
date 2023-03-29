FROM node:latest

WORKDIR /root/app

COPY package*.json ./

COPY . .

RUN npm install 
RUN cd frontend && npm install

EXPOSE 3000
EXPOSE 5000

CMD ["npm", "run", "dev"]