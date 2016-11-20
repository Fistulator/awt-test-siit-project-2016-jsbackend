var config = require('./config');
var express = require('express');
var bodyParser = require('body-parser');

module.exports = function() {
   var app = express();

   app.use(bodyParser.urlencoded({
       extended: true
   }));
   app.use(bodyParser.json());
   
   //app.use(express.static(__dirname + "/public"));

   // Include all routes so we can use defined REST paths
   // equire('../app/routes/index.server.routes.js')(app);
   require('../app/routes/user.route.js')(app);

   return app;
};