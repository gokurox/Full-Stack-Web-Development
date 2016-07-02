var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Verify = require('./verify');

var Favorites = require("../models/favorites");

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route("/")
	.get(Verify.verifyOrdinaryUser, function (req, res, next) {
		var userID = req.decoded._doc._id;

		Favorites.findOne({
			postedBy: userID
		})
		.populate ("postedBy")
		.populate ("dishes")
		.exec(function (err, userFavorites) {
			if (err)
				throw err;
			res.json(userFavorites);
		});
	})
	.post(Verify.verifyOrdinaryUser, function (req, res, next) {
		var userID = req.decoded._doc._id;
		var dishID = req.body._id;

		Favorites.findOne ({
			postedBy: userID
		}, function (err, userFavorites) {
			if (userFavorites) {
				console.log ("uFav Exists");
				var dishLength = userFavorites.dishes.length;
				var dishExists = false;
				for (var i = 0; i < dishLength; i++) {
					if (userFavorites.dishes[i] == dishID) {
						dishExists = true;
						break;
					}
				}
				if (!dishExists) {
					userFavorites.dishes.push (dishID);
					userFavorites.save (function(err, userFavorites) {
						if (err)
							throw err;
						res.json (userFavorites);
					});
				}
				else {
					res.json({status: "dish already exists"});
				}
			} else {
				console.log ("Creating uFav");
				Favorites.create ({
					postedBy: userID
				}, function (err, userFavorites) {
					if (err)
						throw err;
					userFavorites.dishes.push (dishID);
					userFavorites.save (function(err, userFavorites) {
						if (err)
							throw err;
						res.json (userFavorites);
					});
				});
			}
		});
	})
	.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
		var userID = req.decoded._doc._id;

		Favorites.remove ({
			postedBy: userID
		}, function (err, result) {
			if (err)
				throw err;
			res.json(result);
		});
	})
	.all(function (req, res, next) {
		res.writeHead(404, {
			"Content-Type": "text/html"
		});
		res.write("<html><body><h1>favoriteRouter: " + req.method + " /</h1><p>Can't Route this req</p></body></html>");
		res.end();
	});

favoriteRouter.route("/:dishID")
	.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
		var userID = req.decoded._doc._id;
		var dishID = req.params.dishID;

		Favorites.findOne ({
			postedBy: userID
		}, function (err, userFavorites) {
			if (userFavorites) {
				console.log ("uFav Exists");
				var dishLength = userFavorites.dishes.length;
				var dishExists = false;
				for (var i = 0; i < dishLength; i++) {
					if (userFavorites.dishes[i] == dishID) {
						dishExists = true;
						userFavorites.dishes.splice (i, 1);
						userFavorites.save (function(err, userFavorites) {
							if (err)
								throw err;
							res.json (userFavorites);
						});
						break;
					}
				}
				if (!dishExists)
					res.json({status: "dish doesnot exist in Fav"});
			}
			else {
				res.json({status: "userFav doesnot exist"});
			}
		});
	})
	.all(function (req, res, next) {
		res.writeHead(404, {
			"Content-Type": "text/html"
		});
		res.write("<html><body><h1>favoriteRouter: " + req.method + " /" + req.params.dishID + "</h1><p>Can't Route this req</p></body></html>");
		res.end();
	});

module.exports = favoriteRouter;
