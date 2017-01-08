// Require Event's model defined in 'app/models'
var config = require('./../../config/config');
var Event = require('mongoose').model('Event');
var Application = require('mongoose').model('Application');
var User = require('mongoose').model('User');
var Comment = require('mongoose').model('Comment');
var email = require('./mail.controller');


// Function for event create
exports.create = function(request, response, next) {
    var event = new Event(request.body);

    // Save event from request's body to database
    event.save(function(err) {
        if (err) {
            return next(err);
        }
        else {
            Application.findOne({ "_id": event.applicationId }, function(err, app) {
                if (err) {
                    return next(err);
                }
                else {
                    if (app !== null) {
                        User.find({ '_id': { $in: app.users } }, "mail -_id", function(err, userMails) {
                            if (err) {
                                return next(err);
                            }
                            else {
                                var emails = []
                                userMails.forEach(function(element) {
                                    emails.push(element.mail);
                                });

                                // Send email for every user connected to application
                                email.sendMail(emails, app.name, event);
                                response.json(event);
                            }
                        });
                    }
                    else {
                        return response.status(404).send("Wrong id of application");
                    }

                }
            });
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

// Function for quering all events from database
exports.getAllByAppId = function(request, response, next) {
    // Get all events from database
    Event.find({ "applicationId": request.params.applicationId }, function(err, events) {
        if (err) {
            return next(err);
        }
        else {
            response.json(events);
        }
    });
};