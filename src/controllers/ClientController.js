const clientServices = require("../services/clientServices");

class ProductController {
  async index(req, res) {
    const allClient = await clientServices.findClients();

    res.send({
      welcome: req.loggedEmail,
      allClient,
    });
  }
}

module.exports = new ProductController();
