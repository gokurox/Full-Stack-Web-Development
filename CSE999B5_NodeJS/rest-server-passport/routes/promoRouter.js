var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Verify = require('./verify');

var Promotions = require("../models/promotions");

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route("/")
	/*
	.all(function (req, res, next) {
		res.writeHead(200, {
			"Content-Type": "text/html"
		});
		next();
	})
	*/
	.get(Verify.verifyOrdinaryUser, function (req, res, next) {
		//		res.write("<html><body><h1>promoRouter: GET /</h1><p>Will RETURN all the promos !!</p></body></html>");
		//		res.end();

		Promotions.find({}, function (err, promo) {
			if (err) throw err;
			res.json(promo);
		});
	})
	.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
		//		res.write("<html><body><h1>promoRouter: POST /</h1><p>Will ADD new promo !!</p><p>name: " + req.body.name + ", description: " + req.body.description + "</p></body></html>");
		//		res.end();

		Promotions.create(req.body, function (err, promo) {
			if (err) throw err;
			console.log('Promotion created!');
			var id = promo._id;

			res.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			res.end('Added the promo with id: ' + id);
		});
	})
	.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
		//		res.write("<html><body><h1>promoRouter: DELETE /</h1><p>Will DELETE all the promos !!</p></body></html>");
		//		res.end();

		Promotions.remove({}, function (err, resp) {
			if (err) throw err;
			res.json(resp);
		});
	})
	.all(function (req, res, next) {
		res.writeHead(404, {
			"Content-Type": "text/html"
		});
		res.write("<html><body><h1>promoRouter: " + req.method + " /</h1><p>Can't Route this req</p></body></html>");
		res.end();
	});

promoRouter.route("/:promoID")
	/*
	.all(function (req, res, next) {
		res.writeHead(200, {
			"Content-Type": "text/html"
		});
		next();
	})
	*/
	.get(Verify.verifyOrdinaryUser, function (req, res, next) {
		//		res.write("<html><body><h1>promoRouter: GET /" + req.params.promoID + "</h1><p>Will RETURN the promo with promoID = " + req.params.promoID + " !!</p></body></html>");
		//		res.end();

		Promotions.findById(req.params.promoID, function (err, promo) {
			if (err) throw err;
			res.json(promo);
		});
	})
	.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
		//		res.write("<html><body><h1>promoRouter: PUT /" + req.params.promoID + "</h1><p>Will UPDATE the promo with promoID = " + req.params.promoID + " !!</p><p>New Details: <br />name: " + req.body.name + ", description: " + req.body.description + "</p></body></html>");
		//		res.end();

		Promotions.findByIdAndUpdate(req.params.promoID, {
			$set: req.body
		}, {
			new: true
		}, function (err, promo) {
			if (err) throw err;
			res.json(promo);
		});
	})
	.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
		//		res.write("<html><body><h1>promoRouter: DELETE /" + req.params.promoID + "</h1><p>Will DELETE the promo with promoID = " + req.params.promoID + " !!</p></body></html>");
		//		res.end();

		Promotions.findByIdAndRemove(req.params.promoID, function (err, resp) {
			if (err) throw err;
			res.json(resp);
		});
	})
	.all(function (req, res, next) {
		res.writeHead(404, {
			"Content-Type": "text/html"
		});
		res.write("<html><body><h1>promoRouter: " + req.method + " /" + req.params.promoID + "</h1><p>Can't Route this req</p></body></html>");
		res.end();
	});

//exports.promoRouter = promoRouter;
module.exports = promoRouter;