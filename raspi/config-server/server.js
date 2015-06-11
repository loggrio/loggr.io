var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json

app.post('/', function (req, res) {
  var fs = require('fs');
  var stream = fs.createWriteStream("config.loggr");
  console.log(req.body);

  stream.once('open', function(fd) {
  stream.write(JSON.stringify(req.body));
  stream.end();
});
  res.json(req.body);
});

var server = app.listen(3000);

console.log("Server running on http://localhost:3000");
