var express = require("express");
var router = express.Router();
var user = require('../models/user.js');
var sign = require('../models/sn.js');
// module.exports =function(app){
//     var user = require('../controllers/users');

//     app.route('/users')
//     //.get(user.list_users)
//     .get(function(req,res){
//         res.send({'ress':'hi'});
//     })
//     .post(user.create_user);

//     app.route('/user/:userId')
//     .get(user.read_user)
//     .put(user.update_user);
// }

router
.get('/',function(req,res){
    res.send({'ji0':'bye'});
})

.post('/',function(req,res){
    console.log(req.body);
    res.send({"32":"b45"});
})

// .post('/hi',function(req,res){
//     sign.create(req.body);
// })


.post('/mongo',function(req,res){
    // user.create(req.body).then(function(user){
    //     res.send(user);
    // });
    var usr = new user(req.body);
    usr.save();
});


module.exports = router;