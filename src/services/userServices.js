const User = require('../models/Users');

class userServices {
  
  async Create(name, email, password){
    const newUser = new User({
      name,
      email,
      password
    });

    try {
      await newUser.save();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

}

module.exports = new userServices();