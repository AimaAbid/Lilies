function roleMiddleware(admin) {
	return function (req, res, next) {
		if (req.user.role !== "Admin") {
			console.log(req.user.role);
			return res.status(403).send({ message: "Access Denied" });
		}
		next();
	};
}

module.exports = roleMiddleware;
