var express = require('express'),
app = express(),
port = process.env.PORT || 3080;

app.listen(port);

console.log('Hobby-Hood RESTful API server started on: ' + port+" is Live");