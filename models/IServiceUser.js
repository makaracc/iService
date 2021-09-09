const mongoose = require("mongoose");
const validator = require("validator");
const passportLocalMongoose = require("passport-local-mongoose")
const iserviceUserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not valid!");
      }
    }
  },
  hash: String,
  country: String,
  city: String,
  state: String,
  zip: Number,
  phone: Number
});

// iserviceUserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("iservicedb", iserviceUserSchema);
