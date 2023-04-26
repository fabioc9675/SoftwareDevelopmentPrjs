# MQTT Broker with nodejs, react and ESP32

1. Instalar la biblioteca MQTT.js usando `npm install mqtt --save`

## folders:

**app**: contains react code
**models**: contains database models
**public**: contains html and css code coverted from reactjs
**routes**: contains routing between code

## Modules

### Backend dependencies

-   `npm install mqtt --save` install mqtt library
-   `npm install aedes` install mqtt server library
-   `npm install jsonschema` install schema to avoid an error
-   `npm install express` framework for nodejs
-   `npm install mongoose` allows to connect withh database
-   `npm install dotenv` allows to load environment variables
-   `npm install cors` to work with cors
-   `npm install nodemon -D` to automatically restart server when the code
-   `npm install concurrently` run concurrently server and frontend
-   `npm install socket.io` Package to add socket io functionallity

### Frontend dependencies

-   `npm install react axios` to connect with server
-   `npm install react-router react-router-dom` to use router in Application
-   `npm install socket.io-client` Package to add socket io functionallity
-   `npm install react-bootstrap bootstrap` use bootstrap components
-   `npm install moment` use date time formater
-   `npm install react-icons --save` Icons https://react-icons.github.io/react-icons/
-   `npm install @tensorflow/tfjs` to load tensorflow models

### frontend mqtt 

https://www.npmjs.com/package/precompiled-mqtt

npm install -g webpack                    // Install webpack globally
npm install mqtt                          // Install MQTT library
cd node_modules/mqtt
npm install .                             // Install dev deps at current dir
webpack mqtt.js --output-library mqtt     // Build

o

npm i precompiled-mqtt

## Steps

1. Setting up the Application
2. Setting up the Node Server
3. Creating the Routes
4. Defining the Models
5. Connection to a Database
6. Testing the API
7. Creating the Frontend

## Docker commands for local text

-   `docker build -t fabian/nodeweb:v1 .`
-   `docker run -d -p 3000:3000 -p 5000:5000 fabian/nodeweb:v1`
-   `docker ps`

## Arduino ESP32 library

- GitHub library from RandomNerdTutorials: https://github.com/marvinroger/async-mqtt-client