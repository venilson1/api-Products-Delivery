const User = require('../models/Users');

class userServices {

  async register(name, email, password, role) {
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
    if (id.match(/^[0-9a-fA-F]{24}$/)) {

      try {
        let usersById = await User.findById({ id }, { password: 0 })
        return usersById;
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
  }

  async update(id, name, email, role) {

    const user = ({ name: name, email: email, role: role })

    if (user != undefined) {

      var editUser = {}

      if (email) {
        const result = await this.findEmail(email);
        if (result === null) {
          editUser.email = email;
        } else {
          return { status: false, error: "O email já está cadastrado" }
        }
      }

      if (name) {
        editUser.name = name;
      }

      if (role) {
        editUser.role = role;
      }

      await User.findByIdAndUpdate(id, editUser)
      return { status: true }

    } else {
      return { status: false, error: "O usuário não existe" }
    }
  }

  async delete(id){
      try {
        await User.findByIdAndDelete(id)
        return {status: true }
      } 
      catch (error) {
        return { status: false, error: "O usuário não existe" }
      }
   
  }
}

module.exports = new userServices();