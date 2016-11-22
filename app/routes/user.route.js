// Include User's controller
var user = require('../../app/controllers/user.controller');

module.exports = function(app) {
    // POST '/api/users' - add new user
    app.route('/api/users').post(user.create);
    // GET '/api/users' - get all users
    app.route('/api/users').get(user.list);
    // POST '/api/users/authenticate' - Authenticate user
    app.route('/api/users/authenticate').post(user.auth);
};