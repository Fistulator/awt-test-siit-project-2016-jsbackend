// Require Event's model defined in 'app/models'
var config = require('./../../config/config');
var Event = require('mongoose').model('Event');

// Function for event create
exports.create = function(request, response, next) {
    var event = new Event(request.body);

    // Save event from request's body to database
    event.save(function(err) {
        if (err) {
            return next(err);
        }
        else {
            response.json(event);
        }
    });
};

// Function for quering all events from database
exports.list = function(request, response, next) {
    // Get all events from database
    Event.find({}, function(err, events) {
        if (err) {
            return next(err);
        }
        else {
            response.json(events);
        }
    });
};