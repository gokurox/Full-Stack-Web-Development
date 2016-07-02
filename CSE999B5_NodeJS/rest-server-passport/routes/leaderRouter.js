var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Verify = require('./verify');

var Leaders = require("../models/leadership");

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route("/")
	/*.all(function (req, res, next) {
		res.writeHead(200, {
			"Content-Type": "text/html"
		});
		next();
	})*/
	.get(Verify.verifyOrdinaryUser, function (req, res, next) {
		//		res.write("<html><body><h1>leaderRouter: GET /</h1><p>Will RETURN all the leaders !!</p></body></html>");
		//		res.end();

		Leaders.find({}, function (err, leader) {
			if (err) throw err;
			res.json(leader);
		});
	})
	.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
		//		res.write("<html><body><h1>leaderRouter: POST /</h1><p>Will ADD new leader !!</p><p>name: " + req.body.name + ", description: " + req.body.description + "</p></body></html>");
		//		res.end();

		Leaders.create(req.body, function (err, leader) {
			if (err) throw err;
			console.log('Leader created!');
			var id = leader._id;

			res.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			res.end('Added the leader with id: ' + id);
		});
	})
	.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
		//		res.write("<html><body><h1>leaderRouter: DELETE /</h1><p>Will DELETE all the leaders !!</p></body></html>");
		//		res.end();

		Leaders.remove({}, function (err, resp) {
			if (err) throw err;
			res.json(resp);
		});
	})
	.all(function (req, res, next) {
		res.writeHead(404, {
			"Content-Type": "text/html"
		});
		res.write("<html><body><h1>leaderRouter: " + req.method + " /</h1><p>Can't Route this req</p></body></html>");
		res.end();
	});

leaderRouter.route("/:leaderID")
	/*
	.all(function (req, res, next) {
		res.writeHead(200, {
			"Content-Type": "text/html"
		});
		next();
	})
	*/
	.get(Verify.verifyOrdinaryUser, function (req, res, next) {
		//		res.write("<html><body><h1>leaderRouter: GET /" + req.params.leaderID + "</h1><p>Will RETURN the leader with leaderID = " + req.params.leaderID + " !!</p></body></html>");
		//res.end();

		Leaders.findById(req.params.leaderID, function (err, leader) {
			if (err) throw err;
			res.json(leader);
		});
	})
	.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
		//		res.write("<html><body><h1>leaderRouter: PUT /" + req.params.leaderID + "</h1><p>Will UPDATE the leader with leaderID = " + req.params.leaderID + " !!</p><p>New Details: <br />name: " + req.body.name + ", description: " + req.body.description + "</p></body></html>");
		//		res.end();

		Leaders.findByIdAndUpdate(req.params.leaderID, {
			$set: req.body
		}, {
			new: true
		}, function (err, leader) {
			if (err) throw err;
			res.json(leader);
		});
	})
	.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
		//		res.write("<html><body><h1>leaderRouter: DELETE /" + req.params.leaderID + "</h1><p>Will DELETE the leader with leaderID = " + req.params.leaderID + " !!</p></body></html>");
		//		res.end();

		Leaders.findByIdAndRemove(req.params.leaderID, function (err, resp) {
			if (err) throw err;
			res.json(resp);
		});
	})
	.all(function (req, res, next) {
		res.writeHead(404, {
			"Content-Type": "text/html"
		});
		res.write("<html><body><h1>leaderRouter: " + req.method + " /" + req.params.leaderID + "</h1><p>Can't Route this req</p></body></html>");
		res.end();
	});

//exports.leaderRouter = leaderRouter;
module.exports = leaderRouter;