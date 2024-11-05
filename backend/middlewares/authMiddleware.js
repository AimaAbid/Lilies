const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

// Middleware to check authentication
function authMiddleware(req, res, next) {
	const token = req.headers["authorization"];

	if (!token) {
		return res
			.status(401)
			.send({ message: "Access Denied. No token provided." });
	}

	try {
		const decoded = jwt.verify(token, secretKey);

		req.user = decoded;

		next();
	} catch (err) {
		if (err.name === "TokenExpiredError") {
			return res
				.status(401)
				.json({ message: "Session expired. Please log in again." });
		}

		return res.status(400).send({ message: "Invalid token." });
	}
}

module.exports = authMiddleware;
