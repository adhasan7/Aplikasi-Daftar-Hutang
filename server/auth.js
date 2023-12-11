// auth.js

const jwt = require("jsonwebtoken");

function generateToken(user) {
  // Anda dapat menyesuaikan penandaan JWT dan kunci rahasia sesuai kebutuhan aplikasi Anda.
  return jwt.sign(user, "secretKey", { expiresIn: "1h" });
}

function authenticateToken(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Token tidak valid, otorisasi ditolak" });
  }

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ msg: "Token tidak valid, otorisasi ditolak" });
  }
}

module.exports = {
  generateToken,
  authenticateToken,
};
