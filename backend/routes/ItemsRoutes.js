var express = require("express");
var Router = express.Router();
var item = require("../models/item");
const authMiddleware = require("../middlewares/authMiddleware");
var cart = require("../models/cart");
var mongoose = require("mongoose");
var order = require("../models/order");

//get items
Router.get("/", (req, res) => {
	item
		.find()
		.then((items) => res.send(items))
		.catch(() => res.send("some error"));
});

Router.get("/get-item/:itemId", authMiddleware, async (req, res) => {
	// const userId = req.user.userId;
	const itemId = req.params.itemId;

	try {
		const searchedItem = await item.findById(itemId);

		if (!searchedItem) {
			return res.status(404).send({ message: "Item not found" });
		}

		res.status(200).send(searchedItem);
	} catch (error) {
		console.error("Error fetching item :", error);
		res.status(500).send({ message: "Error retrieving  item details" });
	}
});

Router.get("/get-cart-item/:itemId", authMiddleware, async (req, res) => {
	const userId = req.user.userId;
	const itemId = req.params.itemId;

	try {
		// Check if the item is in the user's cart
		const cartItem = await cart.findOne({ userId: userId, itemId: itemId });
		if (!cartItem) {
			return res.status(404).send({ message: "Item not found in cart" });
		}

		// get item  from item model
		const itemDetails = await item.findById(itemId);
		if (!itemDetails) {
			return res.status(404).send({ message: "Item details not found" });
		}

		res.status(200).send(itemDetails);
	} catch (error) {
		console.error("Error fetching cart item details:", error);
		res.status(500).send({ message: "Error retrieving cart item details" });
	}
});
// add items to cart
Router.post("/add-item-cart", authMiddleware, async (req, res) => {
	const userId = req.user.userId;
	const itemId = req.body.itemId;
	const quantity = req.body.quantity;
	try {
		const selectedItem = await item.findById(itemId);
		if (!selectedItem) {
			return res.status(404).send({ message: "Item not found" });
		}

		// Check if the quantity is available
		if (selectedItem.quantity <= 0) {
			return res.status(400).send({ message: "Item out of stock" });
		}
		const newCart = new cart({
			itemId,
			userId: userId,
			quantity,
		});

		await newCart.save();

		console.log("Cart saved");
		res.status(200).send({ message: "Item added to cart" });
	} catch (err) {
		console.error("Error adding item:", err);
		res.status(500).send({ message: "Error adding item" });
	}
});
//get a user's cart-items
Router.get("/get-cart-items", authMiddleware, async (req, res) => {
	const userId = req.user.userId;

	try {
		const cartItems = await cart.aggregate([
			{ $match: { userId: new mongoose.Types.ObjectId(userId) } },
			{
				$lookup: {
					from: "items",
					localField: "itemId",
					foreignField: "_id",
					as: "itemDetails",
				},
			},
			{ $unwind: "$itemDetails" },
			{
				$project: {
					itemId: 1,
					quantity: 1,
					"itemDetails.name": 1,
					"itemDetails.price": 1,
					"itemDetails.image": 1,
					subtotal: { $multiply: ["$quantity", "$itemDetails.price"] },
				},
			},
		]);

		if (cartItems.length === 0) {
			console.log("No items matched for userId!:", userId);
			return res.status(404).send({ message: "No items in cart" });
		}

		const totalAmount = cartItems.reduce((acc, item) => acc + item.subtotal, 0);

		res.status(200).send({ cartItems, totalAmount });
	} catch (error) {
		console.error("Error fetching cart items:", error);
		res.status(500).send({ message: "Error retrieving cart items" });
	}
});

// Delete from cart
Router.delete("/delete-item-cart/:itemId", authMiddleware, (req, res) => {
	const userId = req.user.userId;
	const itemId = req.params.itemId;

	cart
		.findOneAndDelete({ itemId: itemId, userId: userId })
		.then(() => res.status(200).send("Item deleted successfully!"))
		.catch((error) => {
			console.error("Error deleting item:", error);
			res.status(500).send("Error deleting item");
		});
});

Router.post("/order/checkout", authMiddleware, async (req, res) => {
	const userId = req.user.userId;
	const { itemId, quantity } = req.body;

	try {
		const itemToOrder = await item.findById(itemId);
		if (!itemToOrder) {
			return res.status(404).send({ message: "Item not found" });
		}

		if (itemToOrder.quantity < quantity) {
			return res.status(400).send({ message: "Insufficient item quantity" });
		}

		const currentDate = new Date();
		const date = currentDate.toISOString().split("T")[0];
		const time = currentDate.toTimeString().split(" ")[0];

		// Create a new order
		const newOrder = new order({
			itemId,
			userId,
			quantity,
			date,
			time,
		});
		await newOrder.save();

		itemToOrder.quantity -= quantity;
		await itemToOrder.save();

		// Remove the item from the cart model
		await cart.findOneAndDelete({ itemId, userId });

		console.log("Order saved and item quantity updated");
		res.status(200).send({ message: "Order completed successfully" });
	} catch (err) {
		console.error("Error processing checkout:", err);
		res.status(500).send({ message: "Error processing checkout" });
	}
});

//get a user's orders

Router.get("/get-order-items", authMiddleware, async (req, res) => {
	const userId = req.user.userId;

	try {
		const orderItems = await order.aggregate([
			{ $match: { userId: new mongoose.Types.ObjectId(userId) } },
			{
				$lookup: {
					from: "items",
					localField: "itemId",
					foreignField: "_id",
					as: "itemDetails",
				},
			},
			{ $unwind: "$itemDetails" },
			{
				$project: {
					itemId: 1,
					quantity: 1,
					time: 1,
					date: 1,
					"itemDetails.name": 1,
					"itemDetails.price": 1,
					"itemDetails.image": 1,
					subtotal: { $multiply: ["$quantity", "$itemDetails.price"] },
				},
			},
		]);

		if (orderItems.length === 0) {
			console.log("No items matched for userId:", userId);
			return res.status(404).send({ message: "No items in cart" });
		}

		const totalAmount = orderItems.reduce(
			(acc, item) => acc + item.subtotal,
			0
		);

		res.status(200).send({ orderItems, totalAmount });
	} catch (error) {
		console.error("Error fetching order items:", error);
		res.status(500).send({ message: "Error retrieving order items" });
	}
});

module.exports = Router;
