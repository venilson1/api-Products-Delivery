const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: false,
  },
  description: {
    type: String,
    require: true,
    unique: false,
  },
  price: {
    type: Number,
    require: true,
    unique: false,
  },
  promotion: {
    type: Boolean,
    require: true,
    unique: false,
  },
  discount: {
    type: Number,
    require: true,
    unique: false,
  },
  path: {
    type: String,
    require: false,
    unique: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    unique: false,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
