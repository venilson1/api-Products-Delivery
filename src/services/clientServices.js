const Client = require("../models/Clients");

class ClientServices {
  async findClients() {
    let clients = await Client.find();
    return clients;
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
}

module.exports = new ClientServices();
