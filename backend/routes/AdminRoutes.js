const express = require("express");
const router = express.Router();
const user = require("../models/user");
const roleMiddleware = require("../middlewares/roleMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

// Route to get all users (only accessible by admins)
router.get(
	"/users",
	authMiddleware,
	roleMiddleware("Admin"),
	async (req, res) => {
		try {
			const users = await user.find();
			res.status(200).json(users);
		} catch (error) {
			res.status(500).json({ message: "Error fetching users" });
		}
	}
);

// Route to update user role (only accessible by admin)
router.patch(
	"/assign-role/:id",
	authMiddleware,
	roleMiddleware("Admin"),
	async (req, res) => {
		const userId = req.params.id;
		const newRole = req.body.role;

		try {
			await user.findByIdAndUpdate(userId, { role: newRole });
			res.status(200).send({ message: "Role updated successfully" });
		} catch (error) {
			res.status(500).send({ message: "Error updating role" });
		}
	}
);

module.exports = router;
