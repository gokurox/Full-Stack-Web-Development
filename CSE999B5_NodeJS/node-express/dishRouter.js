var express = require ("express");
var bodyParser = require ("body-parser");

var dishRouter = express.Router();
dishRouter.use (bodyParser.json());

dishRouter.route ("/")
	.all (function (request, response, next) {
		response.writeHead (200, {"Content-Type": "text/html"});
		next ();
	})
	.get (function (request, response, next) {
		response.write ("<html><body><h1>dishRouter: GET /</h1><p>Will RETURN all the dishes !!</p></body></html>");
		response.end ();
	})
	.post (function (request, response, next) {
		response.write ("<html><body><h1>dishRouter: POST /</h1><p>Will ADD new dish !!</p><p>name: " + request.body.name + ", description: " + request.body.description + "</p></body></html>");
		response.end ();
	})
	.delete (function (request, response, next) {
		response.write ("<html><body><h1>dishRouter: DELETE /</h1><p>Will DELETE all the dishes !!</p></body></html>");
		response.end ();
	})
	.all (function (request, response, next) {
		response.write ("<html><body><h1>dishRouter: " + request.method + " /</h1><p>Can't Route this request</p></body></html>");
		response.end ();
	});

dishRouter.route ("/:dishID")
	.all (function (request, response, next) {
		response.writeHead (200, {"Content-Type": "text/html"});
		next ();
	})
	.get (function (request, response, next) {
		response.write ("<html><body><h1>dishRouter: GET /" + request.params.dishID + "</h1><p>Will RETURN the dish with dishID = " + request.params.dishID + " !!</p></body></html>");
		response.end ();
	})
	.put (function (request, response, next) {
		response.write ("<html><body><h1>dishRouter: PUT /" + request.params.dishID + "</h1><p>Will UPDATE the dish with dishID = " + request.params.dishID + " !!</p><p>New Details: <br />name: " + request.body.name + ", description: " + request.body.description + "</p></body></html>");
		response.end ();
	})
	.delete (function (request, response, next) {
		response.write ("<html><body><h1>dishRouter: DELETE /" + request.params.dishID + "</h1><p>Will DELETE the dish with dishID = " + request.params.dishID + " !!</p></body></html>");
		response.end ();
	})
	.all (function (request, response, next) {
		response.write ("<html><body><h1>dishRouter: " + request.method + " /" + request.params.dishID + "</h1><p>Can't Route this request</p></body></html>");
		response.end ();
	});

exports.dishRouter = dishRouter;