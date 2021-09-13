const clientServices = require("../services/clientServices");

class ClientController {
  async index(req, res) {
    const allClient = await clientServices.findClients();

    res.send({
      welcome: req.loggedEmail,
      allClient,
    });
  }

  async getClientById(req, res) {
    let id = req.params.id;
    const clientById = await ClientServices.findClientId(id);

    if (clientById) {
      res.status(200).json({ clientById });
    } else {
      res.status(404).json({});
    }
  }
}

module.exports = new ClientController();
