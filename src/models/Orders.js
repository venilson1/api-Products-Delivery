const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  clientId: {
    type: String,
    require: true,
    unique: false,
  },
  order: {
    type: Object,
    require: true,
    unique: false,
  },
  stage: {
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

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
