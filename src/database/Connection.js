const mongoose = require('mongoose');

const URI = '';

const connectDB = async () => {
  try {
    await mongoose.connect(
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