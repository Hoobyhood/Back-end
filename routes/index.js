
var express = require('express');
var bodyParser = require('body-parser');
var routes = express.Router();
routes.use(bodyParser.json());

/* GET home page. */
routes.route('/',ensureAuthenticated)
.get(function(req, res, next) {
  res.json('index');
});
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = routes;