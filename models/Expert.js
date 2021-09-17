const mongoose = require("mongoose");
const validator = require("validator");
const passportLocalMongoose = require("passport-local-mongoose")
const experSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: Number,
  password: String
  
});

// iserviceUserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("expert", experSchema);
