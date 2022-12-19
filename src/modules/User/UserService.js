const User = require("./User");

class UserService {

  async findAll() {
    try{
      const data = await User.find({}, { password: 0, __v: false });
      return data;
    }catch(error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const data = await User.findById(id).select('-password -__v');
      return data;
    } catch (error) {
      throw error;
    }
  }

  async insert(    
    name,
    address,
    complement,
    reference,
    email,
    password,
    telephone) {
    const newUser = new User({
      name,
      address,
      complement,
      reference,
      email,
      password,
      telephone,
    });
    try{
      let user = await newUser.save();
      return user;
    } catch (e){
      throw e;
    }
  }

  async findEmail(email) {
    const emailExists = await User.findOne({ email });
    return emailExists;
  }

  async update(id, name, address, complement, reference, email, telephone) {

    // const result = await this.findEmail(email);
    // if (result) throw "e-mail already registered";

    try{
      const data = await User
        .findByIdAndUpdate(id, { $set: { id, name, address, complement, reference, email, telephone }})
        .select('-password -__v');
      return data;
    } catch(error){
      throw error;
    }
  }

  async delete(id) {
    try{
      const data = await User.findByIdAndDelete(id);
      return data;
    }catch(error){
      throw error;
    }
  }

  async findMe(id){
    try{
      const data = await User.findById(id);
      return data;
    }catch(error){
      throw error;
    }
  }
}

module.exports = new UserService();
