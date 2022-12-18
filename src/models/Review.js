const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
  clientId: { type: Schema.Types.ObjectId, ref: "Client" },
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  rating: {
    type: Number,
    require: true,
    unique: false,
  },
  title: {
    type: String,
    require: true,
    unique: false,
  },
  body: {
    type: String,
    require: true,
    unique: false,
  },
  rated: {
    type: Boolean,
    require: true,
    unique: false,
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

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;

