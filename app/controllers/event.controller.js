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
                        // If version of event is newer than latest version of application
                        if (isNewer(event.versionNumber, app.latestVersion)) {
                            // Update application in database
                            Application.findOne({"_id": app._id}, function(err, application) {
                                if (err) next(err);

                                // Set application latest version
                                application.latestVersion = event.versionNumber;

                                application.save(function(err, app) {
                                    if (err) next(err);
                                });
                            });
                        }

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

// Function for querying Event by its ID
exports.getOne = function(request, response, next) {
    // Get event with provided ID in request
    Event.findOne(
        {
            "_id": request.params.eventId
        },
        function(err, event) {
            if (err) {
                return next(err);
            } else {
                response.json(event);
            }
        }).populate(
            {
                path: 'comments',
                // Get comments of comments - populate the 'comments' array for every comment and signedBy
                populate: {
                    path: 'signedBy comments',
                    select: '-password',
                    populate: {
                        path: 'signedBy',
                        select: '-password',
                    }
                }
            }
        );
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

// Function for quering all events by specified Application fragment
exports.getEventsByAppFragment = function(request, response, next) {
    Event.find(
        {
            "applicationId": request.params.applicationId,
            "fragment": request.params.fragment
        }, function(err, events) {
            if (err) {
                return next(err);
            }
            else {
                response.json(events);
            }
    });
};

/**
 * Private function for checking which version is newer
 * Application version is in format major.minor.patch
 *
 * @param {String}  oldVersion
 * @param {String}  newVersion
 * @return is new version 'newer' than old one.
 */
function isNewer(newVersion, oldVersion) {
    // Old version splitted
    var ov = oldVersion.split('.');
    // New version splitted
    var nv = newVersion.split('.');

    if (parseInt(nv[0]) > parseInt(ov[0])) {
        return true;
    }
    else if (parseInt(nv[0]) == parseInt(ov[0])) {
        if (parseInt(nv[1]) > parseInt(ov[1])) {
            return true;
        }
        else if (parseInt(nv[1]) == parseInt(ov[1])) {
            if (parseInt(nv[2]) > parseInt(ov[2])) {
                return true;
            }
        }
    }

    return false;
}