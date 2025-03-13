const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Dohvati token iz header-a
  const token = req.header("x-auth-token");

  // Proveri da li token postoji
  if (!token) {
    return res.status(401).json({ message: "Nema tokena, pristup odbijen" });
  }

  try {
    // Verifikuj token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "tajni_kljuc");

    // Postavi userId u request
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token nije validan" });
  }
};
