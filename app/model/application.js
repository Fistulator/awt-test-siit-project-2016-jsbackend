var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema
({
    versionNumber: String,
    stack: String,
    time:
    {
        type: Date,
        default: Date.now
    },
    fragment: String
});

var applicationSchema = new Schema
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
    creator:
    {
        type: String,
        required: true
    },
    events: [eventSchema]
});

var Application = mongoose.model('Application', applicationSchema);
var Event = mongoose.model('Event', eventSchema);

module.exports = 
{
    Application,
    myEvent
};