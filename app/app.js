var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('../app/model/user');
var Application = require('../app/model/application').Application;
var myEvent = require('../app/model/application').myEvent;
var userRouter = require('../app/routers/userRouter');
var appRouter = require('../app/routers/appRouter');

mongoose.connect('mongodb://localhost/jsBackend');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 9000; 

var eventRouter = express.Router();


app.use('api/users', userRouter);
app.use('api/apps', appRouter);
app.use('api/events', eventRouter);

app.use(function(err,req,res,next)
{
    var message = err.message;
    var error = err.error || err;
    var status = arr.status || 500;

    res.status(status).json
    ({
        message: message,
        error: error
    });
});

app.listen(port);

console.log('Server radi na portu ' + port);
