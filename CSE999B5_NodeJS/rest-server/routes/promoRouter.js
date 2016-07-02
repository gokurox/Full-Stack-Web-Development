var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var Promotions = require("../models/promotions");

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route("/")
	/*
	.all(function (request, response, next) {
		response.writeHead(200, {
			"Content-Type": "text/html"
		});
		next();
	})
	*/
	.get(function (request, response, next) {
		//		response.write("<html><body><h1>promoRouter: GET /</h1><p>Will RETURN all the promos !!</p></body></html>");
		//		response.end();

		Promotions.find({}, function (err, promo) {
			if (err) throw err;
			response.json(promo);
		});
	})
	.post(function (request, response, next) {
		//		response.write("<html><body><h1>promoRouter: POST /</h1><p>Will ADD new promo !!</p><p>name: " + request.body.name + ", description: " + request.body.description + "</p></body></html>");
		//		response.end();

		Promotions.create(request.body, function (err, promo) {
			if (err) throw err;
			console.log('Promotion created!');
			var id = promo._id;

			response.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			response.end('Added the promo with id: ' + id);
		});
	})
	.delete(function (request, response, next) {
		//		response.write("<html><body><h1>promoRouter: DELETE /</h1><p>Will DELETE all the promos !!</p></body></html>");
		//		response.end();

		Promotions.remove({}, function (err, resp) {
			if (err) throw err;
			response.json(resp);
		});
	})
	.all(function (request, response, next) {
		response.writeHead(404, {
			"Content-Type": "text/html"
		});
		response.write("<html><body><h1>promoRouter: " + request.method + " /</h1><p>Can't Route this request</p></body></html>");
		response.end();
	});

promoRouter.route("/:promoID")
	/*
	.all(function (request, response, next) {
		response.writeHead(200, {
			"Content-Type": "text/html"
		});
		next();
	})
	*/
	.get(function (request, response, next) {
		//		response.write("<html><body><h1>promoRouter: GET /" + request.params.promoID + "</h1><p>Will RETURN the promo with promoID = " + request.params.promoID + " !!</p></body></html>");
		//		response.end();

		Promotions.findById(request.params.promoID, function (err, promo) {
			if (err) throw err;
			response.json(promo);
		});
	})
	.put(function (request, response, next) {
		//		response.write("<html><body><h1>promoRouter: PUT /" + request.params.promoID + "</h1><p>Will UPDATE the promo with promoID = " + request.params.promoID + " !!</p><p>New Details: <br />name: " + request.body.name + ", description: " + request.body.description + "</p></body></html>");
		//		response.end();

		Promotions.findByIdAndUpdate(request.params.promoID, {
			$set: request.body
		}, {
			new: true
		}, function (err, promo) {
			if (err) throw err;
			response.json(promo);
		});
	})
	.delete(function (request, response, next) {
		//		response.write("<html><body><h1>promoRouter: DELETE /" + request.params.promoID + "</h1><p>Will DELETE the promo with promoID = " + request.params.promoID + " !!</p></body></html>");
		//		response.end();

		Promotions.findByIdAndRemove(request.params.promoID, function (err, resp) {
			if (err) throw err;
			response.json(resp);
		});
	})
	.all(function (request, response, next) {
		response.writeHead(404, {
			"Content-Type": "text/html"
		});
		response.write("<html><body><h1>promoRouter: " + request.method + " /" + request.params.promoID + "</h1><p>Can't Route this request</p></body></html>");
		response.end();
	});

exports.promoRouter = promoRouter;