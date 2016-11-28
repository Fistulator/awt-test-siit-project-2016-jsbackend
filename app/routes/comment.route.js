// Include Event's controller
var comment = require('../../app/controllers/comment.controller');

module.exports = function(app) {
    // POST   '/api/comments/:id' - get one comment
    app.route('/api/comments/:id').get(comment.getOne);
    // POST   '/api/comments/:commentId' - add new subcomment
    app.route('/api/comments/:commentId').post(comment.createOnComment);
    // POST   '/api/comments/event/:commentId' - add new comment on one event
    app.route('/api/comments/event/:eventId').post(comment.createOnEvent);
    // DELETE '/api/comments/:id' - delete one comment
    app.route('/api/comments/:id').delete(comment.deleteOne);
};