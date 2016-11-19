var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('../app/model/user');
var Application = require('../app/model/application').Application;
var myEvent = require('../app/model/application').myEvent;

//mongoose.connect();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 9000; 

var userRouter = express.Router();

userRouter
    .get('/:id', function(req, res, next){
        User.findOne
        ({
            "id": req.params.id
        }, function(err, user)
        {
            if (err) next (err);
            res.json(user);
        });
    })
    .get('/', function(req,res)
    {
        User.find({}, function (err, data, next)
        {
            res.json(data);
        });
    })
    .post('/', function(req,res,next)
    {
        var user = new User(req.body);
        user.save(function(err, entry)
        {
            if (err) next (err);

            res.json(entry);
        });
    })
    .put('/:id', function(req,res,next)
    {
        User.findOne
        ({
            "_id": req.params.id
        }, function(err, user)
        {
            if (err) next (err);
            var newUser = req.body;
            user.mail = newUser.mail;
            user.username = newUser.username;
            user.name = newUser.name;
            user.surname = newUser.surnam;
            user.password = newUser.password;
            user.save(function(err, user)
            {
                if (err) next (err);
                res.json(user);
            });
        });
    })
    .delete('/:id', function(req,res,next)
    {
        User.remove
        ({
            "_id": req.params.id
        }, function(err, sucessIndicator)
        {
            if (err) next (err);
            res.json(sucessIndicator);
        });
    });

var appRouter = express.Router();

appRouter
    .get('/:id', function(req, res, next)
    {
        Application.findOne
        ({
            "_id": req.params.id
        }, function(err, application)
        {
            if (err) next (err);
            res.json(application);
        });
    })
    .get('/', function(req,res)
    {
        User.find({}, function (err, data, next)
        {
            res.json(data);
        });
    })
    .post('/', function(req, res,next)
    {
        var application = new Application(req.body);
        application.save(function(err, entry)
        {
            if (err) next(err);

            res.json(application)
        });
    })
    .put('/:id', function(req, res, next)
    {
        Application.findOne
        ({
            "_id": req.params.id
        }, function(err, application)
        {
            if (err) next(err);
            var newApp = req.body;
            application.name = newApp.name;
            application.description = newApp.description;
            application.latestVersion = newApp.latestVersion;
            application.repo = newApp.repo;
            application.dsn = newApp.dsn;
            application.events = newApp.events;
            application.save(function(err, application)
            {
                if (err) next(err);
                res.json(application);
            });
        });
    })
    .delete('/:id', function(req, res, next) 
    {
        Application.remove
        ({
            "_id": req.params.id
        }, function(err, sucessIndicator)
        {
            if (err) next(err);
            res.json(sucessIndicator);
        });
    });

var eventRouter = express.Router();

eventRouter 
    .post('')

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
