var config = require('./config');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

module.exports = function() {
   var app = express();

   app.use(bodyParser.urlencoded({
       extended: true
   }));
   app.use(bodyParser.json());

   app.use(cors({origin: 'http://localhost:8080'}));

   // Include all routes so we can use defined REST paths
   // Order of routes import is important
   require('../app/routes/user.route.js')(app);
   require('../app/routes/event.route.js')(app);
   require('../app/routes/application.route.js')(app);
   require('../app/routes/comment.route.js')(app);

   return app;
};