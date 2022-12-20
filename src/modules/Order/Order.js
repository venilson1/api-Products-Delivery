const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  products: [{
    id: {type: Schema.Types.ObjectId, ref: "Product"},
    quantity: { type: Number }, 
  }],
  status: {
    type: String,
    require: true,
    enum: ["Pending", "Received", "Producing", "Sent", "Received"],
    default: "Pending"
  },
  total: { type: Number, default: 0, required: false },
  isPayment: {
    type: Boolean,
    require: true,
    default: false,
  },
  delivery: {
    type: String,
    require: true,
    enum: ["Balcony", "Delivery"]
  },
  createdAt: {
    type: Date,
    default: Date.now,
    unique: false,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
