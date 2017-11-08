var mongoose = require('mongoose');
var schema = mongoose.Schema;


const sSchema = new schema({
    'name':String
});

//module.exports(mongoose.model("sign",sSchema));

var U = mongoose.model('sign', sSchema);
module.exports = U; 