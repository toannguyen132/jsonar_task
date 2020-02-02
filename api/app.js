const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const ServiceError = require('./utils/ServiceError');
const routes = require('./routes');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use('/api', routes);

// 404 handle
app.use(function(req, res, next) {
  next(new ServiceError(404, "Request not found"));
})

// central error handling
app.use((err, req, res, next) => {
  if (err instanceof ServiceError) {
    res.status(err.statusCode).send({
      message: err.message
    });
  } else {
    res.status(400).send({
      message: "Error has been occurred!"
    });
  }
});


module.exports = app;