const Client = require("../models/Clients");

class ClientServices {
  async findClients() {
    let clients = await Client.find();
    return clients;
  }

  async findEmail(email) {
    const emailExists = await Client.findOne({ email });
    return emailExists;
  }

  async findClientId(id) {
    //verificando id valido
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      try {
        let clientById = await Client.findById(id);
        return clientById;
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
  }

  async register(
    name,
    address,
    complement,
    reference,
    email,
    password,
    telephone
  ) {
    const newClient = new Client({
      name,
      address,
      complement,
      reference,
      email,
      password,
      telephone,
    });
    let client = newClient.save();
    return client;
  }

  async update(id, name, address, complement, reference, email, telephone) {
    const client = {
      name,
      address,
      complement,
      reference,
      email,
      telephone,
    };

    if (client != undefined) {
      let editClient = {};

      if (name) {
        editClient.name = name;
      }

      if (address) {
        editClient.address = address;
      }

      if (complement) {
        editClient.complement = complement;
      }

      if (reference) {
        editClient.reference = reference;
      }

      if (email) {
        const emailExists = await this.findEmail(email);

        if (emailExists === null) {
          editClient.email = email;
        } else {
          return { status: false, error: "O email já está cadastrado" };
        }
      }

      if (telephone) {
        editClient.telephone = telephone;
      }

      await Client.findByIdAndUpdate(id, { $set: editClient });
      return { status: true };
    } else {
      return { status: false, error: "O cliente não existe" };
    }
  }

  async delete(id) {
    try {
      await Client.findByIdAndDelete(id);
      return { status: true };
    } catch (error) {
      return { status: false, error: "O cliente não existe" };
    }
  }
}

module.exports = new ClientServices();
