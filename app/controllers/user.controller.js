// Require User's model defined in 'app/models'
var config = require('./../../config/config');
var User = require('mongoose').model('User');
var jwt = require('jsonwebtoken');

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

// Function for authenticating user
exports.authenticate = function(request, response, next) {
  User.findOne({username: request.body.username}, function(err, user) {

      if (err) {
        return next(err);
      }

      if (!user) {
        response.json({ success: false, message: 'Authentication failed. User not found.' });
      }
      else if (user) {
        // Check if password matches
        if (!user.authenticate(request.body.password)) {
          response.json({ success: false, message: 'Authentication failed. Wrong password.' });
        }
        else {
            // Create a token
            var token = jwt.sign(user, config.secretKey);

        // Return token
        response.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
}