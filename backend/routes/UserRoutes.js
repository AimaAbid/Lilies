var express = require("express");
var Router = express.Router();
var user = require("../models/user");
const bcrypt = require("bcrypt");
const secretKey = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
var multer = require("multer");

// console.log('Secret Key:', secretKey);

//signup
// users
// how many times to hash the password
const rounds = 10;

Router.post("/sign-up", async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, rounds);

		const newUser = new user({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});

		await newUser.save();

		console.log("User saved");
		res.status(200).send({ message: "User successfully registered!" });
	} catch (err) {
		console.error("Error saving user:", err);
		res.status(500).send({ message: "Error registering user" });
	}
});

// Edit user by ID (Protected)
Router.put("/edit", authMiddleware, async (req, res) => {
	const userId = req.user.userId;

	if (req.body.password) {
		req.body.password = await bcrypt.hash(req.body.password, rounds);
	} else {
		delete req.body.password;
	}

	try {
		await user.findByIdAndUpdate(userId, req.body, { new: true });
		res.status(200).send("User Updated Successfully!");
	} catch (err) {
		console.error("Error updating user:", err);
		res.status(500).send(err.message);
	}
});

//login

Router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	const desiredUser = await user.findOne({ email });
	if (!desiredUser) {
		console.log("User not found");
		return res.status(400).json({ message: "User not found" });
	}

	// Check if password matches
	const isMatch = await bcrypt.compare(password, desiredUser.password);
	if (!isMatch) {
		console.log("Invalid credentials");
		return res.status(400).json({ message: "Invalid credentials" });
	}

	// make JWT
	const token = jwt.sign(
		{ userId: desiredUser._id, role: desiredUser.role },
		secretKey,
		{ expiresIn: "1h" }
	);

	res.json({ token });
});

// Route to get the cart, protected
Router.get("/user-dashboard", authMiddleware, (req, res) => {
	const userId = req.user.userId;
	// console.log(userId);

	res.status(200).send("User Dashboard");
});

// Get user by ID (Protected)
Router.get("/get-user", authMiddleware, (req, res) => {
	const userId = req.user.userId;
	user
		.findById(userId)
		.then((user) => res.send(user))
		.catch(() => res.send("some error"));
});

// Delete user (Protected)
Router.delete("/delete-user", authMiddleware, (req, res) => {
	const userId = req.user.userId;
	user
		.findByIdAndDelete(userId)
		.then(() => res.send("User deleted Successfully!"))
		.catch(() => res.send("some error"));
});

// set up  multer storage
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./assets");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

var upload = multer({ storage: storage });

// Upload  (Protected)
Router.post("/up", authMiddleware, upload.single("filename"), (req, res) => {
	if (!req.file) {
		return res.status(400).send("No file uploaded.");
	}
	const filePath = req.file.filename;
	res.send(filePath);
	console.log(filePath);
});

module.exports = Router;
