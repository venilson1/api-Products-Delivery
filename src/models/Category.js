const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  // products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  createdAt: {
    type: Date,
    default: Date.now,
    unique: false,
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
