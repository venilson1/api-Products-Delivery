const Client = require("../models/Clients");

class ClientServices {
  async findClients() {
    let clients = await Client.find();
    return clients;
  }
}

module.exports = new ClientServices();
