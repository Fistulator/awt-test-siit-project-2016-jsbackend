var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var UserSchema = new Schema
({
    mail:
    {
        type: String,
        required: true,
        unique: true
    },
    username:
    {
        type: String,
        required: true,
        unique: true
    },
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

UserSchema.pre('save',
    function(next) {
        if (this.password) {
            var md5 = crypto.createHash('md5');
            this.password = md5.update(this.password).digest('hex');
        }

        next();
    }
);

UserSchema.methods.authenticate = function(password) {
    var md5 = crypto.createHash('md5');
    md5 = md5.update(password).digest('hex');

    return this.password === md5;
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne(
        {username: possibleUsername},
        function(err, user) {
            if (!err) {
                if (!user) {
                    callback(possibleUsername);
                }
                else {
                    return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
                }
            }
            else {
                callback(null);
            }
        }
    );
};

var User = mongoose.model("User", UserSchema);
module.exports = User;