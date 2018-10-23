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

app.get("/cupcakeOrders", function(req, res) {
	res.send(_generateCupcakeOrders());
});

app.listen(8000, function () {
  console.log('Listening on port 8000!');
});

// Helper funcs
const _createCupcakeOrder = (userId, numCupcakes, isDelivery) => ({ userId, numCupcakes, isDelivery });

const _generateCupcakeOrders = () => {
	let orders = [];
	
	for (let i = 0; i <= 100; i++) {
		const userId = Math.floor(Math.random() * Math.floor(10));
		const numCupcakes = Math.floor(Math.random() * Math.floor(100)); 
		const isDelivery = Math.random() >= 0.5;
		
		orders.push(_createCupcakeOrder(userId, numCupcakes, isDelivery));
	}
	return orders;
}
