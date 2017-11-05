'use strict';
module.exports =function(app){
    var user = require('../controllers/users');

    app.route('/users')
    .get(user.list_users)
    .post(user.create_user);

    app.route('/user/:userId')
    .get(user.read_user)
    .put(user.update_user);
}