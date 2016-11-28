// Include Event's controller
var event = require('../../app/controllers/event.controller');

module.exports = function(app) {
    // POST   '/api/events' - add new event
    app.route('/api/events').post(event.create);
    // GET    '/api/events' - get all events
    app.route('/api/events').get(event.list);
};