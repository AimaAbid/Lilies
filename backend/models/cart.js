var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cartSchema = new Schema({
	itemId: { type: Schema.Types.ObjectId, ref: "item", required: true },
	userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
	quantity: { type: Number, required: true },
});

var cart = mongoose.model("Cart", cartSchema);

module.exports = cart;
