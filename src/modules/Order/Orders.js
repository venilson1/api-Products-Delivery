const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  order: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  stage: {
    type: Number,
    require: true,
    unique: false,
  },
  total: { type: Number, default: 0, required: false },
  createdAt: {
    type: Date,
    default: Date.now,
    unique: false,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
