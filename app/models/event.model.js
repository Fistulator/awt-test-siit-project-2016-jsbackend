var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema
({
    versionNumber: String,
    stack: String,
    time:
    {
        type: Date,
        default: Date.now
    },
    fragment: String,
    applicationId: 
    {
        type: String,
        required: true   
    }
});

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;