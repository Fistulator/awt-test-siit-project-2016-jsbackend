var config = require('./config');
var express = require('express');
var bodyParser = require('body-parser');

module.exports = function() {
   var app = express();

   app.use(bodyParser.urlencoded({
       extended: true
   }));
   app.use(bodyParser.json());

   // Include all routes so we can use defined REST paths
   require('../app/routes/user.route.js')(app);
   require('../app/routes/event.route.js')(app);
   require('../app/routes/application.route.js')(app);

   return app;
};