const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  rating: {
    type: Number,
    require: true,
    unique: false,
    enum: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
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
  active: {
    type: Boolean,
    require: true,
    default: false
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

