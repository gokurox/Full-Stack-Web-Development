var express = require ("express");
var bodyParser = require ("body-parser");

var leaderRouter = express.Router();
leaderRouter.use (bodyParser.json());

leaderRouter.route ("/")
	.all (function (request, response, next) {
		response.writeHead (200, {"Content-Type": "text/html"});
		next ();
	})
	.get (function (request, response, next) {
		response.write ("<html><body><h1>leaderRouter: GET /</h1><p>Will RETURN all the leaders !!</p></body></html>");
		response.end ();
	})
	.post (function (request, response, next) {
		response.write ("<html><body><h1>leaderRouter: POST /</h1><p>Will ADD new leader !!</p><p>name: " + request.body.name + ", description: " + request.body.description + "</p></body></html>");
		response.end ();
	})
	.delete (function (request, response, next) {
		response.write ("<html><body><h1>leaderRouter: DELETE /</h1><p>Will DELETE all the leaders !!</p></body></html>");
		response.end ();
	})
	.all (function (request, response, next) {
		response.write ("<html><body><h1>leaderRouter: " + request.method + " /</h1><p>Can't Route this request</p></body></html>");
		response.end ();
	});

leaderRouter.route ("/:leaderID")
	.all (function (request, response, next) {
		response.writeHead (200, {"Content-Type": "text/html"});
		next ();
	})
	.get (function (request, response, next) {
		response.write ("<html><body><h1>leaderRouter: GET /" + request.params.leaderID + "</h1><p>Will RETURN the leader with leaderID = " + request.params.leaderID + " !!</p></body></html>");
		response.end ();
	})
	.put (function (request, response, next) {
		response.write ("<html><body><h1>leaderRouter: PUT /" + request.params.leaderID + "</h1><p>Will UPDATE the leader with leaderID = " + request.params.leaderID + " !!</p><p>New Details: <br />name: " + request.body.name + ", description: " + request.body.description + "</p></body></html>");
		response.end ();
	})
	.delete (function (request, response, next) {
		response.write ("<html><body><h1>leaderRouter: DELETE /" + request.params.leaderID + "</h1><p>Will DELETE the leader with leaderID = " + request.params.leaderID + " !!</p></body></html>");
		response.end ();
	})
	.all (function (request, response, next) {
		response.write ("<html><body><h1>leaderRouter: " + request.method + " /" + request.params.leaderID + "</h1><p>Can't Route this request</p></body></html>");
		response.end ();
	});

exports.leaderRouter = leaderRouter;