const mongoose = require("mongoose");
require("dotenv").config();

const ATLAS_URI = process.env.MONGODBATLAS_URI;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(ATLAS_URI, connectionParams);
    console.log("database connected!");
  } catch (err) {
    console.log(`ERROR: \n${err}`);
  }
};

module.exports = connectDB;
