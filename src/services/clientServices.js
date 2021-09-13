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
}

module.exports = new ClientServices();
