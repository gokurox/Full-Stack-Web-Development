var express = require ("express");
var morgan = require ("morgan");

// Require all routers
var dishRouter = require ("./dishRouter").dishRouter;
var promoRouter = require ("./promoRouter").promoRouter;
var leaderRouter = require ("./leaderRouter").leaderRouter;

// Define server parameters
var hostname = "localhost";
var port = 3000;

// Start Express
var app = express();

// Enable Logging
app.use (morgan ("dev"));

// Route all paths using routers
app.use ("/dishes", dishRouter);
app.use ("/promotions", promoRouter);
app.use ("/leadership", leaderRouter);

app.use(express.static(__dirname + '/public'));
app.listen (port, hostname, function() {
	console.log (`Server running at http://${hostname}:${port}/`);
});