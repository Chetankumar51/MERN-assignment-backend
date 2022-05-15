let mongoose = require("mongoose");

let userSchme = new mongoose.Schema({
  fname: {
    type: String,
    minlength: 3,
    maxlength: 34,
    required: true,
  },
  lname: {
    type: String,
    minlength: 3,
    maxlength: 34,
    required: true,
  },
  email: {
    type: String,
    minlength: 3,
    maxlength: 35,
    required: true,
  },
  password: {
    type: String,
    minlength: 7,
    maxlength: 100,
    required: true,
  }
});
module.exports=mongoose.model("Signupdata",userSchme);