const URL = "mongodb://localhost:27017/teste-server";

import mongoose from "mongoose";


mongoose.connect(URL, { useNewUrlParser: true, useCreateIndex: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

db.once("open", function() {
  console.log("Connection success!");
});
