const mongoose = require("mongoose");
const validator = require("validator");
const passportLocalMongoose = require("passport-local-mongoose")
const findOrCreate = require("mongoose-findorcreate");
const iserviceUserSchema = new mongoose.Schema({
  googleId: String,
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
  username: {
    type: String,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not valid!");
      }
    }
  },
  country: String,
  city: String,
  state: String,
  zip: Number,
  phone: Number
});

iserviceUserSchema.plugin(passportLocalMongoose)
iserviceUserSchema.plugin(findOrCreate);

module.exports = mongoose.model("iservicedb", iserviceUserSchema);
