var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema
({
    mail:
    {
        type: String,
        required: true,
        unique: true
    },
    username: String,
    name:
    {
        type: String,
        required: true
    },
    surname:
    {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    },
});

// FIXME Ako ne bude radilo
var User = mongoose.model("User", UserSchema);
module.exports = User;