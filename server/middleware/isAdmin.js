// isAdmin.js

function isAdmin(req, res, next) {
  try {
    // Asumsikan bahwa informasi isAdmin ada pada objek req.user setelah autentikasi
    // atau mungkin juga dapat diperoleh dari sumber data lain sesuai dengan kebutuhan aplikasi.

    // Misalnya, jika menggunakan sistem autentikasi dengan JWT, informasi isAdmin dapat ada dalam payload token.
    const isAdmin = req.user && req.user.isAdmin;

    if (isAdmin) {
      return next();
    } else {
      return res
        .status(403)
        .json({ message: "Unauthorized. Admin access required." });
    }
  } catch (error) {
    // Tangani kesalahan jika terjadi
    console.error("Error in isAdmin middleware:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = isAdmin;
