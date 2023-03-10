const mongoose = require("mongoose");

const DB =
  "mongodb+srv://admin:admin1234@cluster0.d0gi6xn.mongodb.net/?retryWrites=true&w=majority";

let mongoDB = process.env.MONGODB_URI || DB;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongoose connected to db ");
});
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("Connection Successful!");
});
