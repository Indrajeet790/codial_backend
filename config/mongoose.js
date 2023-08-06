const mongoose = require("mongoose");

// connect to the database
mongoose.connect("mongodb+srv://codieal:Gupta1998@cluster0.oidggmh.mongodb.net/Codeial");

// acquire the connection to check if it is successfully
const db = mongoose.connection;

// error
db.on("error", console.error.bind(console, "error connecting to db"));

//up and running the message
db.once("open", function () {
  console.log("successfully connected to the database");
});
module.exports = db;
