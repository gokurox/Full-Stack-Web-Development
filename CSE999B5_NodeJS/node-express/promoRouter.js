var express = require ("express");
var bodyParser = require ("body-parser");

var promoRouter = express.Router();
promoRouter.use (bodyParser.json());

promoRouter.route ("/")
	.all (function (request, response, next) {
		response.writeHead (200, {"Content-Type": "text/html"});
		next ();
	})
	.get (function (request, response, next) {
		response.write ("<html><body><h1>promoRouter: GET /</h1><p>Will RETURN all the promos !!</p></body></html>");
		response.end ();
	})
	.post (function (request, response, next) {
		response.write ("<html><body><h1>promoRouter: POST /</h1><p>Will ADD new promo !!</p><p>name: " + request.body.name + ", description: " + request.body.description + "</p></body></html>");
		response.end ();
	})
	.delete (function (request, response, next) {
		response.write ("<html><body><h1>promoRouter: DELETE /</h1><p>Will DELETE all the promos !!</p></body></html>");
		response.end ();
	})
	.all (function (request, response, next) {
		response.write ("<html><body><h1>promoRouter: " + request.method + " /</h1><p>Can't Route this request</p></body></html>");
		response.end ();
	});

promoRouter.route ("/:promoID")
	.all (function (request, response, next) {
		response.writeHead (200, {"Content-Type": "text/html"});
		next ();
	})
	.get (function (request, response, next) {
		response.write ("<html><body><h1>promoRouter: GET /" + request.params.promoID + "</h1><p>Will RETURN the promo with promoID = " + request.params.promoID + " !!</p></body></html>");
		response.end ();
	})
	.put (function (request, response, next) {
		response.write ("<html><body><h1>promoRouter: PUT /" + request.params.promoID + "</h1><p>Will UPDATE the promo with promoID = " + request.params.promoID + " !!</p><p>New Details: <br />name: " + request.body.name + ", description: " + request.body.description + "</p></body></html>");
		response.end ();
	})
	.delete (function (request, response, next) {
		response.write ("<html><body><h1>promoRouter: DELETE /" + request.params.promoID + "</h1><p>Will DELETE the promo with promoID = " + request.params.promoID + " !!</p></body></html>");
		response.end ();
	})
	.all (function (request, response, next) {
		response.write ("<html><body><h1>promoRouter: " + request.method + " /" + request.params.promoID + "</h1><p>Can't Route this request</p></body></html>");
		response.end ();
	});

exports.promoRouter = promoRouter;