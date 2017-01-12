// Include Event's controller
var event = require('../../app/controllers/event.controller');

module.exports = function(app) {
    // POST   '/api/events' - add new event
    app.route('/api/events').post(event.create);
    // GET    '/api/events' - get all events
    app.route('/api/events').get(event.list);
    // GET    '/api/events/:eventId' - get Event by its ID
    app.route('/api/events/:eventId').get(event.getOne);
    // GET    '/api/applications/:applicationId/events' - get all events by application ID
    app.route('/api/applications/:applicationId/events').get(event.getAllByAppId);
    // GET    '/api/applications/:applicationId/fragments/:fragment' - get all events from the same application fragment
    app.route('/api/applications/:applicationId/fragments/:fragment').get(event.getEventsByAppFragment);
};