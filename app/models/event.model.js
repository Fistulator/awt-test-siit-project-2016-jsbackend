var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = require('mongoose').model('Comment').schema;

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
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});


var Event = mongoose.model('Event', EventSchema);
module.exports = Event;