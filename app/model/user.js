var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema
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

var User = mongoose.model("User", userSchema);

module.exports = User;