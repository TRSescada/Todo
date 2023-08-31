const mongoose = require("mongoose");

const endpoint ="mongodb+srv://admin:admin@cluster0.vt1a5.mongodb.net/todolist";

mongoose
  .connect(endpoint)
  .then((db) => console.log("DB connected: ", db.connection.name))
  .catch((e) => console.error(e));
