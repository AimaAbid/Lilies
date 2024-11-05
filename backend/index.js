var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require("mongoose");
var app = express();
app.use(bodyParser.json());
app.use(cors());
require("dotenv").config();
const roleMiddleware = require("./middlewares/roleMiddleware");

var path = require("path");

// Serve  files from the assets folder
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.listen(8000, () => {
	console.log("listening on 8000");
});

var userRoutes = require("./routes/UserRoutes");

app.use("/users", userRoutes);

var itemRoutes = require("./routes/ItemsRoutes");

app.use("/items", itemRoutes);

const adminRoutes = require("./routes/AdminRoutes");
app.use("/admin", adminRoutes);

mongoose
	.connect("mongodb://127.0.0.1:27017/Lilies")
	.then(() => {
		console.log("connected to Mongo");
	})
	.catch((err) => {
		console.log(err);
	});
