var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json

app.post('/', function (req, res) {
  var fs = require('fs');
  var regex = /"token":"\w{5}"/g;
  var homevzr = process.env.HOME;
  var stream = fs.createWriteStream(process.env.HOME + '/.config.loggrrc');
  var tokenString = JSON.stringify(req.body);

  console.log(req.body);
  console.log(JSON.stringify(req.body));

if (tokenString.match(regex)) {
    console.log('Token matches');
    stream.once('open', function(fd) {
    stream.write(JSON.stringify(req.body));
    stream.end();
  });
} else {
    console.log('It is not a token');
}

  res.json(req.body);
});

var server = app.listen(3000);

console.log("Server running on http://localhost:3000");
