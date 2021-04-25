const mongoose = require('mongoose');

const URI = 
'mongodb+srv://dbUser:dbUserPassword@cluster0.nbrrw.mongodb.net/api-users?retryWrites=true&w=majority';

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