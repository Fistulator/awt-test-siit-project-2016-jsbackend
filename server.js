/*
  Requirements:
    - config for configuration
    - express for server
    - mongoose is ORM for database
*/
var config   = require('./config/config');
var mongoose = require('./config/mongoose');
var express  = require('./config/express');

var PORT = config.port || 8081;

// Express and Database variables
var db = mongoose();
var app = express();

app.listen(PORT);

module.exports = app;

console.log('Server running at http://localhost:' + PORT);