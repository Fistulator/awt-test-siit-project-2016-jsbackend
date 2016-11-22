'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local');

// Require User model for database checking
var User = require('../app/models/user.model');

passport.use(new LocalStrategy(

    function(username, password, done) {
        User.findOne({'username': username}, function(err, user) {
            // If some error happened...
            if (err)
                return done(err);

            // If User is not found...
            if (!user)
                return done(null, false, {message: 'User is not found!'});

            // If password is wrong...
            if (!user.authenticate(password))
                return done(null, false, {message: 'Wrong password!'});

            // If user is successfully logged in
            return done(null, {
              email: user.mail,
              firstname: user.name,
              lastname: user.lastname
            });
        });
    }
));

module.exports = passport;