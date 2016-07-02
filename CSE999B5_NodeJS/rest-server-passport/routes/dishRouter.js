var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Verify = require('./verify');

var Dishes = require("../models/dishes");

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route("/")
	/*
	.all(function (req, res, next) {
		res.writeHead(200, {
			"Content-Type": "text/html"
		});
		next();
	})
	*/
	.get(Verify.verifyOrdinaryUser, function (req, res, next) {
		//		res.write("<html><body><h1>dishRouter: GET /</h1><p>Will RETURN all the dishes !!</p></body></html>");
		//		res.end();

		Dishes.find({})
			.populate('comments.postedBy')
			.exec(function (err, dish) {
				if (err) throw err;
				res.json(dish);
			});
	})
	.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
		//		res.write("<html><body><h1>dishRouter: POST /</h1><p>Will ADD new dish !!</p><p>name: " + req.body.name + ", description: " + req.body.description + "</p></body></html>");
		//		res.end();

		Dishes.create(req.body, function (err, dish) {
			if (err) throw err;
			console.log('Dish created!');
			var id = dish._id;

			res.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			res.end('Added the dish with id: ' + id);
		});
	})
	.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
		//		res.write("<html><body><h1>dishRouter: DELETE /</h1><p>Will DELETE all the dishes !!</p></body></html>");
		//		res.end();

		Dishes.remove({}, function (err, resp) {
			if (err) throw err;
			res.json(resp);
		});
	})
	.all(function (req, res, next) {
		res.writeHead(404, {
			"Content-Type": "text/html"
		});
		res.write("<html><body><h1>dishRouter: " + req.method + " /</h1><p>Can't Route this req</p></body></html>");
		res.end();
	});

dishRouter.route("/:dishID")
	/*
	.all(function (req, res, next) {
		res.writeHead(200, {
			"Content-Type": "text/html"
		});
		next();
	})
	*/
	.get(Verify.verifyOrdinaryUser, function (req, res, next) {
		//		res.write("<html><body><h1>dishRouter: GET /" + req.params.dishID + "</h1><p>Will RETURN the dish with dishID = " + req.params.dishID + " !!</p></body></html>");
		//		res.end();

		Dishes.findById(req.params.dishId)
			.populate('comments.postedBy')
			.exec(function (err, dish) {
				if (err) throw err;
				res.json(dish);
			});
	})
	.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
		//		res.write("<html><body><h1>dishRouter: PUT /" + req.params.dishID + "</h1><p>Will UPDATE the dish with dishID = " + req.params.dishID + " !!</p><p>New Details: <br />name: " + req.body.name + ", description: " + req.body.description + "</p></body></html>");
		//		res.end();

		Dishes.findByIdAndUpdate(req.params.dishID, {
			$set: req.body
		}, {
			new: true
		}, function (err, dish) {
			if (err) throw err;
			res.json(dish);
		});
	})
	.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
		//		res.write("<html><body><h1>dishRouter: DELETE /" + req.params.dishID + "</h1><p>Will DELETE the dish with dishID = " + req.params.dishID + " !!</p></body></html>");
		//		res.end();

		Dishes.findByIdAndRemove(req.params.dishID, function (err, resp) {
			if (err) throw err;
			res.json(resp);
		});
	})
	.all(function (req, res, next) {
		res.writeHead(404, {
			"Content-Type": "text/html"
		});
		res.write("<html><body><h1>dishRouter: " + req.method + " /" + req.params.dishID + "</h1><p>Can't Route this req</p></body></html>");
		res.end();
	});

dishRouter.route('/:dishID/comments')
	.get(Verify.verifyOrdinaryUser, function (req, res, next) {
		Dishes.findById(req.params.dishId)
			.populate('comments.postedBy')
			.exec(function (err, dish) {
				if (err) throw err;
				res.json(dish.comments);
			});
	})
	.post(Verify.verifyOrdinaryUser, function (req, res, next) {
		Dishes.findById(req.params.dishId, function (err, dish) {
			if (err) throw err;
			req.body.postedBy = req.decoded._doc._id;
			dish.comments.push(req.body);
			dish.save(function (err, dish) {
				if (err) throw err;
				console.log('Updated Comments!');
				res.json(dish);
			});
		});
	})
	.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
		Dishes.findById(req.params.dishId, function (err, dish) {
			if (err) throw err;
			for (var i = (dish.comments.length - 1); i >= 0; i--) {
				dish.comments.id(dish.comments[i]._id).remove();
			}
			dish.save(function (err, result) {
				if (err) throw err;
				res.writeHead(200, {
					'Content-Type': 'text/plain'
				});
				res.end('Deleted all comments!');
			});
		});
	})
	.all(function (req, res, next) {
		res.writeHead(404, {
			"Content-Type": "text/html"
		});
		res.write("<html><body><h1>dishRouter: " + req.method + " /" + req.params.dishID + "/" + "comments</h1><p>Can't Route this req</p></body></html>");
		res.end();
	});

dishRouter.route('/:dishID/comments/:commentID')
	.get(Verify.verifyOrdinaryUser, function (req, res, next) {
		Dishes.findById(req.params.dishId)
			.populate('comments.postedBy')
			.exec(function (err, dish) {
				if (err) throw err;
				res.json(dish.comments.id(req.params.commentId));
			});
	})
	.put(Verify.verifyOrdinaryUser, function (req, res, next) {
		// We delete the existing commment and insert the updated
		// comment as a new comment
		Dishes.findById(req.params.dishId, function (err, dish) {
			if (err) throw err;
			if (dish.comments.id(req.params.commentId).postedBy != req.decoded._doc._id) {
				var err = new Error('You are not authorized to perform this operation!');
				err.status = 403;
				return next(err);
			}
			dish.comments.id(req.params.commentId).remove();
			req.body.postedBy = req.decoded._doc._id;
			dish.comments.push(req.body);
			dish.save(function (err, dish) {
				if (err) throw err;
				console.log('Updated Comments!');
				res.json(dish);
			});
		});
	})
	.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
		Dishes.findById(req.params.dishId, function (err, dish) {
			if (dish.comments.id(req.params.commentId).postedBy != req.decoded._doc._id) {
				var err = new Error('You are not authorized to perform this operation!');
				err.status = 403;
				return next(err);
			}
			dish.comments.id(req.params.commentId).remove();
			dish.save(function (err, resp) {
				if (err) throw err;
				res.json(resp);
			});
		});
	})
	.all(function (req, res, next) {
		res.writeHead(404, {
			"Content-Type": "text/html"
		});
		res.write("<html><body><h1>dishRouter: " + req.method + " /" + req.params.dishID + "/" + "comments/" + req.params.commentID + "</h1><p>Can't Route this req</p></body></html>");
		res.end();
	});

//exports.dishRouter = dishRouter;
module.exports = dishRouter;