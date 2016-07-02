var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var Leaders = require("../models/leadership");

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route("/")
	/*.all(function (request, response, next) {
		response.writeHead(200, {
			"Content-Type": "text/html"
		});
		next();
	})*/
	.get(function (request, response, next) {
		//		response.write("<html><body><h1>leaderRouter: GET /</h1><p>Will RETURN all the leaders !!</p></body></html>");
		//		response.end();

		Leaders.find({}, function (err, leader) {
			if (err) throw err;
			response.json(leader);
		});
	})
	.post(function (request, response, next) {
		//		response.write("<html><body><h1>leaderRouter: POST /</h1><p>Will ADD new leader !!</p><p>name: " + request.body.name + ", description: " + request.body.description + "</p></body></html>");
		//		response.end();

		Leaders.create(request.body, function (err, leader) {
			if (err) throw err;
			console.log('Leader created!');
			var id = leader._id;

			response.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			response.end('Added the leader with id: ' + id);
		});
	})
	.delete(function (request, response, next) {
		//		response.write("<html><body><h1>leaderRouter: DELETE /</h1><p>Will DELETE all the leaders !!</p></body></html>");
		//		response.end();

		Leaders.remove({}, function (err, resp) {
			if (err) throw err;
			response.json(resp);
		});
	})
	.all(function (request, response, next) {
		response.writeHead(404, {
			"Content-Type": "text/html"
		});
		response.write("<html><body><h1>leaderRouter: " + request.method + " /</h1><p>Can't Route this request</p></body></html>");
		response.end();
	});

leaderRouter.route("/:leaderID")
	/*
	.all(function (request, response, next) {
		response.writeHead(200, {
			"Content-Type": "text/html"
		});
		next();
	})
	*/
	.get(function (request, response, next) {
		//		response.write("<html><body><h1>leaderRouter: GET /" + request.params.leaderID + "</h1><p>Will RETURN the leader with leaderID = " + request.params.leaderID + " !!</p></body></html>");
		//response.end();

		Leaders.findById(request.params.leaderID, function (err, leader) {
			if (err) throw err;
			response.json(leader);
		});
	})
	.put(function (request, response, next) {
		//		response.write("<html><body><h1>leaderRouter: PUT /" + request.params.leaderID + "</h1><p>Will UPDATE the leader with leaderID = " + request.params.leaderID + " !!</p><p>New Details: <br />name: " + request.body.name + ", description: " + request.body.description + "</p></body></html>");
		//		response.end();

		Leaders.findByIdAndUpdate(request.params.leaderID, {
			$set: request.body
		}, {
			new: true
		}, function (err, leader) {
			if (err) throw err;
			response.json(leader);
		});
	})
	.delete(function (request, response, next) {
		//		response.write("<html><body><h1>leaderRouter: DELETE /" + request.params.leaderID + "</h1><p>Will DELETE the leader with leaderID = " + request.params.leaderID + " !!</p></body></html>");
		//		response.end();

		Leaders.findByIdAndRemove(request.params.leaderID, function (err, resp) {
			if (err) throw err;
			response.json(resp);
		});
	})
	.all(function (request, response, next) {
		response.writeHead(404, {
			"Content-Type": "text/html"
		});
		response.write("<html><body><h1>leaderRouter: " + request.method + " /" + request.params.leaderID + "</h1><p>Can't Route this request</p></body></html>");
		response.end();
	});

exports.leaderRouter = leaderRouter;