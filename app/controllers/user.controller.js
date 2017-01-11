// Require User's model defined in 'app/models'
var config = require('./../../config/config');
var passport = require('../../config/passport');
var jwt = require('jsonwebtoken');

var User = require('mongoose').model('User');

// Function for user create
exports.create = function(request, response, next) {
    var user = new User(request.body);

    // Save user from request's body to database
    user.save(function(err) {
        if (err) {
            return next(err);
        }
        else {
            response.json(user);
        }
    });
};

// Function for quering all users from database
exports.list = function(request, response, next) {
    // Get all users from database
    User.find({}, function(err, users) {
        if (err) {
            return next(err);
        }
        else {
            response.json(users);
        }
    });
};

exports.auth = function(request, response, next) {
    passport.authenticate('local',
        {
          session: false,
        },
        function (err, user, info) {
          // If some error is happened
          if (err)
              return next(err);

          // If User is not found or Password is wrong
          if (!user)
              return response.json({ message: info.message });

          // Make token
          var token = jwt.sign({
            mail: user.email,
          }, config.secretKey);

          // Return Token and User in response
          response.status(200).json({
              user: user,
              token: token
          });

        })(request, response, next);
};

exports.update = function(request, response, next) {
    User.findOne({"_id": request.params.id}, function(err, user){
        if (err) next(err);
        var newUser = request.body;
        user.name = newUser.name;
        user.surname = newUser.surname;
        user.imagePath = newUser.imagePath;
        user.password = newUser.password;
        user.save(function(err, user) {
            if (err) next(err);
            response.json(user);
        });
    });
};