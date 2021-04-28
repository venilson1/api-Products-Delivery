const User = require('../models/Users');

class userServices{
  
  async Create(name, email, password, role){
    const newUser = new User({
      name,
      email,
      password,
      role
    });

    try {
      await newUser.save();
    } catch (error) {
      console.log(error);
    }
  }

  async findEmail(email){
    const emailExists = await User.findOne({ email })

    return emailExists;
  }

}

module.exports = new userServices();