const User = require('../models/Users');

class userServices {

  async Create(name, email, password, role) {
    const newUser = new User({ name, email, password, role });
    let user = await newUser.save();
    return user;
  }

  async findEmail(email) {
    const emailExists = await User.findOne({ email })
    return emailExists;
  }

  async findAllUsers() {
    let allUsers = await User.find({}, { password: 0 })
    return allUsers;
  }

  async findUserId(id) {
    //verificando id valido
    if(id.match(/^[0-9a-fA-F]{24}$/)){
      
      try {
        let usersById = await User.findById({ _id : id}, { password: 0 })
        return usersById;
      } catch (error) {
        console.log(error);
        return undefined;
      }

    } 

  }
}

module.exports = new userServices();