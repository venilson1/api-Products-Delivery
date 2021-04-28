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

  async findAllUsers(){
    let allUsers = await User.find({}, { password: 0 })
    return allUsers;
  }

  async findUserId(id){
    let usersById = await User.findById(id, { password: 0 })
    return usersById;
  } 

}

module.exports = new userServices();