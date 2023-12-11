const bcrypt = require("bcryptjs");

const data = {
  users: [
    {
      username: "Admin",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      username: "John",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
};
