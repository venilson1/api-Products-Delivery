const Admin = require("../models/Admins");

class AdminServices {
  async register(name, email, password) {
    const newAdmin = new Admin({ name, email, password });
    let admin = await newAdmin.save();
    return admin;
  }

  async findEmail(email) {
    const emailExists = await Admin.findOne({ email });
    return emailExists;
  }

  async findAllAdmins() {
    let allAdmins = await Admin.find({}, { password: 0 });
    return allAdmins;
  }

  async findAdminId(id) {
    //verificando id valido
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      try {
        let adminById = await Admin.findById(id);
        return adminById;
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
  }

  async update(id, name, email, Admin) {
    const admin = { name, email };

    if (admin != undefined) {
      let editAdmin = {};

      if (email) {
        const result = await this.findEmail(email);
        if (result === null) {
          editAdmin.email = email;
        } else {
          return { status: false, error: "O email já está cadastrado" };
        }
      }

      if (name) {
        editAdmin.name = name;
      }

      await Admin.findByIdAndUpdate(id, { $set: editAdmin });
      return { status: true };
    } else {
      return { status: false, error: "O usuário não existe" };
    }
  }

  async delete(id) {
    try {
      await Admin.findByIdAndDelete(id);
      return { status: true };
    } catch (error) {
      return { status: false, error: "O usuário não existe" };
    }
  }
}

module.exports = new AdminServices();
