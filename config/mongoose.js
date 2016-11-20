var config   = require('./config');
var mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);

    // Include defined models in Mongoose
    require('../app/models/user.model');

    return db;
}