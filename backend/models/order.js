var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
	itemId: { type: Schema.Types.ObjectId, ref: "item", required: true },
	userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
	quantity: { type: Number, required: true },
	date: { type: String, required: true },
	time: { type: String, required: true },
});

var order = mongoose.model("Order", OrderSchema);

module.exports = order;
