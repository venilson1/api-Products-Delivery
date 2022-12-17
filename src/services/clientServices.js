const Client = require("../models/Clients");

class ClientServices {

  async findAll() {
    try{
      const data = await Client.find({}, { password: 0, __v: false });
      return data;
    }catch(error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const data = await Client.findById(id).select('-password -__v');
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
    const newClient = new Client({
      name,
      address,
      complement,
      reference,
      email,
      password,
      telephone,
    });
    try{
      let client = await newClient.save();
      return client;
    } catch (e){
      throw e;
    }
  }

  async findEmail(email) {
    const emailExists = await Client.findOne({ email });
    return emailExists;
  }

  async update(id, name, address, complement, reference, email, telephone) {

    const result = await this.findEmail(email);
    if (result) throw "e-mail already registered";

    try{
      const data = await Client.findByIdAndUpdate(id, { $set: { id, name, address, complement, reference, email, telephone }});
      return data;
    } catch(error){
      throw error;
    }
  }

  async delete(id) {
    try{
      const data = await Client.findByIdAndDelete(id);
      return data;
    }catch(error){
      throw error;
    }
  }
}

module.exports = new ClientServices();
