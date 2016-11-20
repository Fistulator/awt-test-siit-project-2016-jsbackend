var express = require('express');


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

module.exports = userRouter;