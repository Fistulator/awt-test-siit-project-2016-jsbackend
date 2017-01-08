// Require Application's model defined in 'app/models'
var config = require('./../../config/config');
var Application = require('mongoose').model('Application');

// Function for querying applications by ID
exports.getOne = function(request, response, next) {
    // Get application with provided ID in request
    Application.findOne(
      {
          "_id": request.params.id
      },
      function(err, application) {
        if (err) {
            return next(err);
        }
        else {
            response.json(application);
        }
    });
};

// Function for querying applications by creator email
exports.getAllByCreator = function(request, response, next) {
    // Get application with provided ID in request
    Application.find(
      {
          "creator": request.params.creator
      },
      function(err, applications) {
        if (err) {
            return next(err);
        }
        else {
            response.json(applications);
        }
    });
};

// Function for application create
exports.create = function(request, response, next) {
    var application = new Application(request.body);

    // Save application from request's body to database
    application.save(function(err) {
        if (err) {
            return next(err);
        }
        else {
            response.json(application);
        }
    });
};

// Function for quering all applications from database
exports.list = function(request, response, next) {
    // Get all applications from database
    Application.find({}, function(err, applications) {
        if (err) {
            return next(err);
        }
        else {
            response.json(applications);
        }
    });
};

exports.update = function(request, response, next) {
    Application.findOne({"_id": request.params.id}, function(err, application){
        if (err) next(err);
        var newApplication = request.body;
        application.name = newApplication.name;
        application.description = newApplication.description;
        application.latestVersion = newApplication.latestVersion;
        application.repo = newApplication.repo;
        application.dsn = newApplication.dsn;
        application.users = application.users;
        application.save(function(err, application) {
            if (err) next(err);
            response.json(application);
        });
  });
};