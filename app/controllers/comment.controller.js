// Require Event's model defined in 'app/models'
var config = require('./../../config/config');
var Event = require('mongoose').model('Event');
var Comment = require('mongoose').model('Comment');


exports.getOne = function (request, response, next) {
    Comment.findOne({
        "_id": request.params.id
    }).populate("comments").exec(function (err, comment) {
        if (err) return next(err);
        if (comment == null) return response.status(404).send("Wrong id of comment");
        response.json(comment);
    });
};

exports.createOnComment = function (request, response, next) {
    var comment = new Comment(request.body);
    Comment.findOne({ "_id": request.params.commentId }, function (err, foundComment) {
        if (err) return next(err);
        if (foundComment == null) return response.status(404).send("Wrong id of comment");
        comment.save(function (err, savedComment) {
            if (err) {
                return next(err);
            }
            Comment.findByIdAndUpdate(
                foundComment._id, { $push: { "comments": savedComment._id } }, { new: true })
                .populate('comments').exec(function (err, updatedComment) {
                    if (err) {
                        return next(err);
                    }
                    response.json(updatedComment);
                });
        });
    });
};

exports.createOnEvent = function (request, response, next) {
    var comment = new Comment(request.body);
    Event.findOne({ "_id": request.params.eventId }, function (err, event) {
        if (err) return next(err);
        if (event == null) return response.status(404).send("Wrong id of event");
        comment.save(function (err, comment) {
            if (err) {
                return next(err);
            }
            Event.findByIdAndUpdate(
                event._id, { $push: { "comments": comment._id } }, { new: true })
                .populate('comments').exec(function (err, updatedEvent) {
                    if (err) {
                        return next(err);
                    }
                    response.json(updatedEvent);
                });
        });
    });
};

exports.deleteOne = function (request, response, next) {
    Comment.remove({ "_id": request.params.id }, function (err, successIndicator) {
        if (err) return next(err);
        response.json(successIndicator);
    });
};