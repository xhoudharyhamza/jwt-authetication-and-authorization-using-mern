let mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  token:{
    type: String,
  }
});
let User = mongoose.model("User", userSchema);
module.exports = User;
