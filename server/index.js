// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const UserModel = require("./Models/User");

// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect("mongodb://127.0.0.1:27017/crud");

// app.get("/", (req, res) => {
//   UserModel.find()
//     .then((users) => res.json(users))
//     .catch((err) => res.json(err));
// });

// app.post("/create", (req, res) => {
//   UserModel.create(req.body)
//     .then((user) => res.json(user))
//     .catch((err) => res.json(err));
// });

// app.put("/update/:id", (req, res) => {
//   const id = req.params.id;
//   UserModel.findByIdAndUpdate(
//     { _id: id },
//     {
//       nama: req.body.nama,
//       alamat: req.body.alamat,
//       total: req.body.total,
//     }
//   )
//     .then((user) => res.json(user))
//     .catch((err) => res.json(err));
// });

// app.delete("/deleteuser/:id", (req, res) => {
//   const id = req.params.id;
//   //  UserModel.findByIdAndDelete({ _id: id })
//   UserModel.findByIdAndDelete(id)
//     .then((response) => res.json(response))
//     .catch((err) => res.json(err));
// });

// // app.delete("/deleteuser/:id", (req, res) => {
// //   const id = req.params.id;

// //   if (!id) {
// //     return res.status(400).json({ error: "Invalid id provided" });
// //   }

// //   UserModel.findByIdAndDelete({ _id: id })
// //     .then((response) => {
// //       if (!response) {
// //         return res.status(404).json({ error: "User not found" });
// //       }
// //       res.json(response);
// //     })
// //     .catch((err) => res.status(500).json(err));
// // });

// // ...

// // app.get("/search", (req, res) => {
// //   const keyword = req.query.keyword; // Mendapatkan kata kunci pencarian dari query parameter

// //   // Mencari user berdasarkan nama atau alamat yang mengandung kata kunci
// //   UserModel.find({
// //     $or: [
// //       { nama: { $regex: keyword, $options: "i" } }, // $options: "i" membuat pencarian menjadi case-insensitive
// //       { alamat: { $regex: keyword, $options: "i" } },
// //     ],
// //   })
// //     .then((users) => res.json(users))
// //     .catch((err) => res.json(err));
// // });

// // ...

// app.listen(3001, () => {
//   console.log("Server is Running");
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // Tambahkan baris ini untuk menggunakan JSON Web Tokens
const isAdmin = require("./middleware/isAdmin"); // Import middleware isAdmin
const UserModel = require("./Models/User");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crud");

// Middleware untuk otorisasi admin
function authenticateToken(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Token tidak valid, otorisasi ditolak" });
  }

  try {
    const decoded = jwt.verify(token, "secretKey"); // Ganti 'secretKey' dengan kunci rahasia yang sesuai
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ msg: "Token tidak valid, otorisasi ditolak" });
  }
}

app.get("/", authenticateToken, isAdmin, (req, res) => {
  UserModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.post("/create", authenticateToken, isAdmin, (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.put("/update/:id", authenticateToken, isAdmin, (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      nama: req.body.nama,
      alamat: req.body.alamat,
      total: req.body.total,
    }
  )
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.delete("/deleteuser/:id", authenticateToken, isAdmin, (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete(id)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is Running");
});
