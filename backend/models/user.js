var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, default: "User" }, // "User" by default
	image: { type: String, required: false },
});

var user = mongoose.model("User", userSchema);

module.exports = user;
