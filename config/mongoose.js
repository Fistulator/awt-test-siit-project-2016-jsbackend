var config   = require('./config');
var mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);

    // Include defined models in Mongoose
    require('../app/models/user.model');
    require('../app/models/comment.model');
    require('../app/models/event.model');
    require('../app/models/application.model');

    return db;
}