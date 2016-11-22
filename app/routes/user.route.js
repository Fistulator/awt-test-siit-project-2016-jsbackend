// Include User's controller
var user = require('../../app/controllers/user.controller');
var passport = require('../../config/passport');

module.exports = function(app) {
    // POST '/api/users' - add new user
    app.route('/api/users').post(user.create);
    // GET '/api/users' - get all users
    app.route('/api/users').get(user.list);
    // POST '/api/users/authenticate' - Authenticate user
    app.route('/api/users/authenticate')
        .post(passport.authenticate('local',
          {
            session: false,
            // failWithError: true
          }),
          authSuccess);

    function authSuccess(req, res) {
        req.token = jwt.sign({
            id: req.user.id,
        }, 'server secret');

        res.status(200).json({
            user: req.user,
            token: req.token
        });
    };

};