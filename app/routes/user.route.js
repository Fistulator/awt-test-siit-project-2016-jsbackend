var jwt = require('jsonwebtoken');

// Include User's controller
var user = require('../../app/controllers/user.controller');

module.exports = function(app) {
    // POST '/api/users' - add new user
    app.route('/api/users').post(user.create);
    // POST '/api/users/authenticate' - Authenticate user
    app.route('/api/users/authenticate').post(user.auth);
    // PUT '/api/users/:id' - update user information
    app.route('/api/users/:id').put(user.update);
    // GET '/api/users/:mail' - get user information without password
    app.route('/api/users/:mail').get(user.getOne);
    // GET '/api/users/unique/email/:mail' - check if mail is unique
    app.route('/api/users/unique/email/:mail').get(user.checkUniqueMail);
    // GET '/api/users/unique/email/:username' - check if username is unique
    app.route('/api/users/unique/username/:username').get(user.checkUniqueUsername);

    /** Function for filtering requsts...
     *  Only first two functions can be accessed without jwt token.
     */
    app.use(function(request, response, next) {
        var token = request.headers['x-auth-token'];
        if (token) {
            jwt.verify(token, app.get('secretKey'), function(err, decoded) {
                if (err) {
                    return response.json({
                      success: false,
                      message: 'Failed to authenticate token.'
                    });
                }
                else {
                    request.decoded = decoded;
                    next();
                }
            });

        }
        else {
            return response.status(403).send({
              success: false,
              message: 'No token provided.'
            });
        }
    });

    // GET '/api/users' - get all users
    app.route('/api/users').get(user.list);
};