var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

var usersFilePath = path.join(__dirname, 'data/boat_ramps.geojson');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/data', function(req, res, next) {
  var readable = fs.createReadStream(usersFilePath);
  readable.pipe(res);
});

app.listen(5000, () => console.log('Listening on port 5000'));
