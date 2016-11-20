// Require User's model defined in 'app/models'
var config = require('./../../config/config');
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