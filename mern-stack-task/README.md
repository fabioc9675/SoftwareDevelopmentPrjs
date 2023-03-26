# Creation of new app with Mongo DB and React Js

## folders:

app: contains react code
models: contains database models
public: contains html and css code coverted from reactjs
routes: contains routing between code

## init nodejs app

`npm init --yes`

## Modules

- `npm install express` framework for nodejs
- `npm install nodemon -D` to automatically restart server when the code changes
- `npm install morgan` allows to watch the request from clients
- `npm install mongoose` allows to connect withh database
- `npm install webpack -D` convert code from react to javascript, HTML and CSS
- `npm install webpack-cli -D` run with webpack
- `npm install react react-dom -D` install react components just development way
- `npm install babel-core babel-loader -D` translate jsx code use babel-loader@7
- `npm install babel-preset-react babel-preset-env -D` translate for React

Use of MaterializeCSS through CDN `www.materializecss.com` copy the CSS part into index.html, alse add the icons provided for materialize

It is necessary to add JSON Web Token to guarant that the res api is just accessed by the app, and the use of login

## Local Database

### Initialization

- `sudo apt install mongodb`
- `sudo systemctl enable mongodb`
- `sudo systemctl start mongodb`
- `mongod` these commands initiate the daemon to execute mongodb
