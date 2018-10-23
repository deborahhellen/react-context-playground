var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  var url = path.resolve( __dirname + '/public/index.html');
  res.sendFile(url);
});

app.get("/currentUser", function(req, res) {
	res.send({
		userId: 1,
		firstName: 'Deborah',
		lastName: 'Hellen'
	});
});

app.listen(8000, function () {
  console.log('Listening on port 8000!');
});