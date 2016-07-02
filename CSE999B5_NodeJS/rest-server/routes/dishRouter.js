var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var Dishes = require("../models/dishes");

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route("/")
	/*
	.all(function (request, response, next) {
		response.writeHead(200, {
			"Content-Type": "text/html"
		});
		next();
	})
	*/
	.get(function (request, response, next) {
		//		response.write("<html><body><h1>dishRouter: GET /</h1><p>Will RETURN all the dishes !!</p></body></html>");
		//		response.end();

		Dishes.find({}, function (err, dish) {
			if (err) throw err;
			response.json(dish);
		});
	})
	.post(function (request, response, next) {
		//		response.write("<html><body><h1>dishRouter: POST /</h1><p>Will ADD new dish !!</p><p>name: " + request.body.name + ", description: " + request.body.description + "</p></body></html>");
		//		response.end();

		Dishes.create(request.body, function (err, dish) {
			if (err) throw err;
			console.log('Dish created!');
			var id = dish._id;

			response.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			response.end('Added the dish with id: ' + id);
		});
	})
	.delete(function (request, response, next) {
		//		response.write("<html><body><h1>dishRouter: DELETE /</h1><p>Will DELETE all the dishes !!</p></body></html>");
		//		response.end();

		Dishes.remove({}, function (err, resp) {
			if (err) throw err;
			response.json(resp);
		});
	})
	.all(function (request, response, next) {
		response.writeHead(404, {
			"Content-Type": "text/html"
		});
		response.write("<html><body><h1>dishRouter: " + request.method + " /</h1><p>Can't Route this request</p></body></html>");
		response.end();
	});

dishRouter.route("/:dishID")
	/*
	.all(function (request, response, next) {
		response.writeHead(200, {
			"Content-Type": "text/html"
		});
		next();
	})
	*/
	.get(function (request, response, next) {
		//		response.write("<html><body><h1>dishRouter: GET /" + request.params.dishID + "</h1><p>Will RETURN the dish with dishID = " + request.params.dishID + " !!</p></body></html>");
		//		response.end();

		Dishes.findById(request.params.dishID, function (err, dish) {
			if (err) throw err;
			response.json(dish);
		});
	})
	.put(function (request, response, next) {
		//		response.write("<html><body><h1>dishRouter: PUT /" + request.params.dishID + "</h1><p>Will UPDATE the dish with dishID = " + request.params.dishID + " !!</p><p>New Details: <br />name: " + request.body.name + ", description: " + request.body.description + "</p></body></html>");
		//		response.end();

		Dishes.findByIdAndUpdate(request.params.dishID, {
			$set: request.body
		}, {
			new: true
		}, function (err, dish) {
			if (err) throw err;
			response.json(dish);
		});
	})
	.delete(function (request, response, next) {
		//		response.write("<html><body><h1>dishRouter: DELETE /" + request.params.dishID + "</h1><p>Will DELETE the dish with dishID = " + request.params.dishID + " !!</p></body></html>");
		//		response.end();

		Dishes.findByIdAndRemove(request.params.dishID, function (err, resp) {
			if (err) throw err;
			response.json(resp);
		});
	})
	.all(function (request, response, next) {
		response.writeHead(404, {
			"Content-Type": "text/html"
		});
		response.write("<html><body><h1>dishRouter: " + request.method + " /" + request.params.dishID + "</h1><p>Can't Route this request</p></body></html>");
		response.end();
	});

dishRouter.route('/:dishID/comments')
	.get(function (request, response, next) {
		Dishes.findById(request.params.dishID, function (err, dish) {
			if (err) throw err;
			response.json(dish.comments);
		});
	})
	.post(function (request, response, next) {
		Dishes.findById(request.params.dishID, function (err, dish) {
			if (err) throw err;
			dish.comments.push(request.body);
			dish.save(function (err, dish) {
				if (err) throw err;
				console.log('Updated Comments!');
				response.json(dish);
			});
		});
	})
	.delete(function (request, response, next) {
		Dishes.findById(request.params.dishID, function (err, dish) {
			if (err) throw err;
			for (var i = (dish.comments.length - 1); i >= 0; i--) {
				dish.comments.id(dish.comments[i]._id).remove();
			}
			dish.save(function (err, result) {
				if (err) throw err;
				response.writeHead(200, {
					'Content-Type': 'text/plain'
				});
				response.end('Deleted all comments!');
			});
		});
	})
	.all(function (request, response, next) {
		response.writeHead(404, {
			"Content-Type": "text/html"
		});
		response.write("<html><body><h1>dishRouter: " + request.method + " /" + request.params.dishID + "/" + "comments</h1><p>Can't Route this request</p></body></html>");
		response.end();
	});

dishRouter.route('/:dishID/comments/:commentID')
	.get(function (request, response, next) {
		Dishes.findById(request.params.dishID, function (err, dish) {
			if (err) throw err;
			response.json(dish.comments.id(request.params.commentID));
		});
	})
	.put(function (request, response, next) {
		// We delete the existing commment and insert the updated
		// comment as a new comment
		Dishes.findById(request.params.dishID, function (err, dish) {
			if (err) throw err;
			dish.comments.id(request.params.commentID).remove();
			dish.comments.push(request.body);
			dish.save(function (err, dish) {
				if (err) throw err;
				console.log('Updated Comments!');
				response.json(dish);
			});
		});
	})
	.delete(function (request, response, next) {
		Dishes.findById(request.params.dishID, function (err, dish) {
			dish.comments.id(request.params.commentID).remove();
			dish.save(function (err, resp) {
				if (err) throw err;
				response.json(resp);
			});
		});
	})
	.all(function (request, response, next) {
		response.writeHead(404, {
			"Content-Type": "text/html"
		});
		response.write("<html><body><h1>dishRouter: " + request.method + " /" + request.params.dishID + "/" + "comments/" + request.params.commentID + "</h1><p>Can't Route this request</p></body></html>");
		response.end();
	});

exports.dishRouter = dishRouter;