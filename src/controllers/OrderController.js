const orderServices = require("../services/orderServices");

class OrderController {
  async index(req, res) {
    const allOrders = await orderServices.findOrders();

    res.send({
      allOrders,
      welcome: req.loggedEmail,
    });
  }

  async newOrder(req, res) {
    let { clientId, order } = req.body;

    try {
      const status = await orderServices.register(clientId, order);
      res.status(200).send(status);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new OrderController();
