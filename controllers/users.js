var mongoose = require('mongoose')
    User = mongoose.model('user');

exports.list_users =function(req,res){
    User.find({},function(err,user){
        if(err)
            res.send(err);
        res.json(user);
    });
};

exports.create_user = function(req, res) {
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  };