var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json

app.post('/', function (req, res) {
  console.log(req.body);
  res.json(req.body);
});

var server = app.listen(3000);

console.log("Server running on http://localhost:3000");
