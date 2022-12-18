const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: false,
  },
  description: {
    type: String,
    require: false,
    unique: false,
  },
  price: {
    type: Number,
    require: true,
    unique: false,
  },
  promotion: {
    type: Boolean,
    require: false,
    unique: false,
  },
  discount: {
    type: Number,
    require: false,
    unique: false,
  },
  path: {
    type: String,
    require: false,
    unique: false,
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Reviews" }],
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  createdAt: {
    type: Date,
    default: () => Date.now() - 3*60*60*1000
  },
  updateAt: {
    type: Date,
    default: () => Date.now() - 3*60*60*1000
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
