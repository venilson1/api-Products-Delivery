const Admin = require("../models/Admins");

class AdminServices {

  async findAll() {
    try{
      const data = await Admin.find({}, { password: 0, __v: false });
      return data;
    }catch(error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const data = await Admin.findById(id).select('-password -__v');
      return data;
    } catch (error) {
      throw error;
    }
  }

  async insert(name, email, password, role) {
    const newAdmin = new Admin({ name, email, password, role });
    try{
      let admin = await newAdmin.save();
      return admin;
    } catch (e){
      throw e;
    }
  }

  async findEmail(email) {
    const emailExists = await Admin.findOne({ email });
    return emailExists;
  }

  async update(id, name, email, role) {

    const result = await this.findEmail(email);
    if(result) throw "e-mail already registered";

    try{
      const data = await Admin.findByIdAndUpdate(id, { $set: { id, name, email, role }});
      return data;
    } catch(error){
      throw error;
    }
  }

  async delete(id) {
    try{
      const data = await Admin.findByIdAndDelete(id);
      return data;
    }catch(error){
      throw error;
    }
  }
}

module.exports = new AdminServices();
