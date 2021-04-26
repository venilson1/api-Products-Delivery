const mongoClient = require('mongoose');
require('dotenv').config()

const URI = process.env.MONGODB_URI

const connectDB = async () => {
  try {
    await mongoClient.connect(
      URI,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true
      });
    console.log('database connected!');
  } catch (err) {
    console.log(`ERROR: ${err}`);
  }
}

module.exports = connectDB;