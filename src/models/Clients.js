const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
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
  },
  password: {
    type: String,
    require: true,
    unique: false,
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
  createdAt: {
    type: Date,
    default: Date.now,
    unique: false,
  },
});

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
