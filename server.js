/*
  Requirements:
    - config    for configuration
    - express   for server
    - mongoose  is ODM for MongoDB database
    - passport  for authentication
*/
var config   = require('./config/config');
var mongoose = require('./config/mongoose');
var express  = require('./config/express');
var passport = require('./config/passport');
var errorHandler = require('./config/error-handler');
var http     = require('http');

var PORT = config.port || 8081;

// Express and Database variables
var db = mongoose();
var app = express();

app.set('secretKey', config.secretKey);
app.use(passport.initialize());

// Middleware for error handling
app.use(errorHandler);

http.createServer(app).listen(PORT);

module.exports = app;

console.log('Server running at http://localhost:' + PORT);