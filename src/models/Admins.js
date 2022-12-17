const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: false,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    require: true,
    unique: false,
  },
  role: {
    type: [String],
    require: true,
    unique: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    unique: false,
  },
  updateAt: {
    type: Date,
    default: Date.now,
    unique: false,
  },
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
