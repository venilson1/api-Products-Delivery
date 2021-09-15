const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
  clientId: { type: Schema.Types.ObjectId, ref: "Client" },
  order: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  stage: {
    type: Number,
    require: true,
    unique: false,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    unique: false,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
