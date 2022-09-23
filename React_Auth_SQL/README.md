# REACT AUTH with SQL SERVER

Application to configurate SQL server and REACT Frontend

## Tutorial

https://www.youtube.com/playlist?list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp

## Frontend

It is necessary to install react in root folder

- Create react app `npx create-react-app client`
- Install react `npm install react`
- Insert semantic ui `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" />`
- Install axios to do request to the backend `npm install axios`

## Backend

Server installation

- server init `npm init`
- install some packages `npm install express cors`
- to update changes online `npm install nodemon`
- to parser date `npm install body-parser`
- to make a server connection `npm install mysql mysql2`
- to manage env variables `npm install dotenv`

## Auth development

Include packages to development, it will be create under view-controller model

- ejs, express `npm install ejs express`
- Install router `npm install react-router react-router-dom`
- in server install sequalize `npm install sequelize`
- install socket.io in server side `npm install socket.io`
- install socket.io in client side `npm install socket.io-client`
- Install bcrypt to hash the password `npm install bcrypt`
- Install cookie parser `npm install cookie-parser`
- Install jwt in both `npm install jsonwebtoken`

### How to do conection between socketio and sequelizeError

https://stackoverflow.com/questions/30348852/express-how-use-io-socket-emit-in-route-files

I found a way.

Before `app.use('/save', save);` needed to write following code in `app.js`

`app.use(function(req, res, next) {`
` req.io = io;`
` next();`
`});`

and after this get io from req parameter in `save.js` for example

`var express = require('express');`
`var router = express.Router();`

`router.post('/', function(req, res, next) {`
` .....`
` var io = req.io;`
` io.emit('newTweet', 'test');`
` .....`
`});`

`module.exports = router;`

if you know better way than this one, please let me know.
