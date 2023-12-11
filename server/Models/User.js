// const mongose = require("mongoose");

// const UserSchema = new mongose.Schema({
//   nama: String,
//   alamat: String,
//   total: Number,
// });

// const UserModel = mongose.model("users", UserSchema);

// module.exports = UserModel;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    alamat: { type: String },
    total: { type: Number },
  },
  {
    timestamps: true,
  }
);

// Fungsi pre-save untuk menghash password sebelum menyimpan di database
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  // Hash password menggunakan bcrypt
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
