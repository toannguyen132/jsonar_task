# jsonar_task

The home interview assignment for jSonar

## Project description

Client: React

API Server: NodeJS

I used NodeJS for API server running on port 4000 and a React app running on port 3000. The React app called API server through proxy to prevent CORS issue

## Install web client libraries

run these commands:

```
cd web
npm install
```

## Run web client
```
npm start
```

## Client libraries:

the list of libraries used in the React task:

* React
* react-router-dom 
* axios (handle request to api)
* react-bootstrap (UI)
* formik (form validation)
* yup (validation schema)

## Install server

I use NodeJS (express) for the api server

```
cd api
npm install
```

## Run the server

```
npm run start
```

## Server libraries

the libraries list used in the api

* express
* body-parser (parse request data)
* hapi/joi (request validation)
* jsonwebtoken (generate token for authentication)
* lodash (utilities)
* mysql2 (database connection)
* sequelize (database ORM)