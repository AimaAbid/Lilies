// in db item document

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var itemSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	image: { type: String, required: true },
	quantity: { type: Number, required: true },
});

var item = mongoose.model("Item", itemSchema);

module.exports = item;
