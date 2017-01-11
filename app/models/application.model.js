var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = require('mongoose').model('Event').schema;

var ApplicationSchema = new Schema
    ({
        name:
        {
            type: String,
            required: true,
            unique: true
        },
        description:
        {
            type: String,
            required: true
        },
        latestVersion: String,
        repo: String,
        dsn:
        {
            type: String,
            required: true
        },
        imagePath:
        {
            type: String
        },
        creator:
        {
            type: String,
            required: true
        },
        users: [String],
        events: [eventSchema]
    });

var Application = mongoose.model('Application', ApplicationSchema);
module.exports = Application