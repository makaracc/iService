const mongoose = require("mongoose");
const validator = require("validator");
const clientSchema = new mongoose.Schema({
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
  country: String,
  city: String,
  state: String,
  zip: Number,
  phone: Number
});
module.exports = mongoose.model("iservicedb", clientSchema);
