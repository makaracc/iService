const mongoose = require("mongoose");
const validator = require("validator");
const Task = new mongoose.Schema({
  type: String,
  title: String,
  description: String,
  suburb: String,
  date: String,
  estimated_price: String,
  image: String
  
});

// iserviceUserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("task", Task);
