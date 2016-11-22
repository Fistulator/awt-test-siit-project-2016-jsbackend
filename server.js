/*
  Requirements:
    - config for configuration
    - express for server
    - mongoose is ODM for database
*/
var config   = require('./config/config');
var mongoose = require('./config/mongoose');
var express  = require('./config/express');
var passport = require('./config/passport');
var http     = require('http');

jwt = require('jsonwebtoken');

var PORT = config.port || 8081;

// Express and Database variables
var db = mongoose();
var app = express();

app.set('secretKey', config.secretKey);
app.use(passport.initialize());

http.createServer(app).listen(PORT);

module.exports = app;

console.log('Server running at http://localhost:' + PORT);