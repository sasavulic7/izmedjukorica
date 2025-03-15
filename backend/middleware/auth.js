const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("x-auth-token");

    if (!token) {
        console.log("Nema tokena, pristup odbijen");
        return res.status(401).json({ message: "Nema tokena, pristup odbijen" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token verifikovan:", decoded);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log("Token nije validan:", error.message);
        res.status(401).json({ message: "Token nije validan" });
    }
};
