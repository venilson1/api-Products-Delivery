const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: false
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    unique: false
  }
})

const User = mongoose.model('User', userSchema);
module.exports = User;