const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: false,
  },
  address: {
    type: String,
    require: true,
    unique: false,
  },
  complement: {
    type: String,
    require: true,
    unique: false,
  },
  reference: {
    type: String,
    require: true,
    unique: false,
  },
  email: {
    type: String,
    require: false,
    unique: false,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    require: true,
    unique: false,
  },
  telephone: {
    type: String,
    require: true,
    unique: false,
  },
  role: {
    type: [String],
    require: true,
    unique: false,
    default: ["user"]
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },
  createdAt: {
    type: Date,
    default: () => Date.now() - 3*60*60*1000
  },
  updateAt: {
    type: Date,
    default: () => Date.now() - 3*60*60*1000
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
