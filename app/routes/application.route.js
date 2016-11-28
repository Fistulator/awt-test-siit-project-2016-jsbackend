// Include Application's controller
var application = require('../../app/controllers/application.controller');

module.exports = function(app) {
    // GET    '/api/applications/:id'  Get One Application by ID
    app.route('/api/applications/:id').get(application.getOne);
    // GET    '/api/applications'      Get all Applications
    app.route('/api/applications').get(application.list);
    // POST   '/api/applications'      Create new Application
    app.route('/api/applications').post(application.create);
    // PUT    '/api/applications/:id'  Update Application by ID
    app.route('/api/applications/:id').put(application.update);
    // DELETE '/api/applications/:id'  Delete Application by ID
    // app.route('/api/applications/:id').delete(application.remove);
};