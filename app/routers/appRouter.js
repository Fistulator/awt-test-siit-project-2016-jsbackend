var express = require('express');

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
        console.log("lol");
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

module.exports = appRouter;