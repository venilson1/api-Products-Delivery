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
  },
  password: {
    type: String,
    require: true,
    unique: false,
  },
  role: {
    type: Number,
    require: true,
    unique: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    unique: false,
  },
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
