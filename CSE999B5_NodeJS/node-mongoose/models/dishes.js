var mongoose = require("mongoose");
require('mongoose-currency').loadType(mongoose);

var Currency = mongoose.Types.Currency;
var Schema = mongoose.Schema;

// Schema for Comments
var commentSchema = new Schema({
	rating: {
		type: Number,
		min: 1,
		max: 5,
		require: true
	},
	comment: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});

// Schema for Dishes
var dishSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	label: {
		type: String,
		default: ""
	},
	price: {
		type: Currency,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	comments: [commentSchema]
}, {
	timestamps: true
});

// Make Model
var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;