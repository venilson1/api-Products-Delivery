const orderServices = require("../services/orderServices");

class OrderController {
  async index(req, res) {
    const allOrders = await orderServices.findOrders();

    res.send({
      allOrders,
      welcome: req.loggedName,
    });
  }

  async getOrderById(req, res) {
    let id = req.params.id;
    const orderById = await orderServices.findOrderId(id);

    if (orderById == undefined) {
      res.status(404).json({});
    } else {
      res.status(200).json({ orderById });
    }
  }

  async newOrder(req, res) {
    let clientId = req.loggedUserId;
    let orderBody = req.body;
    let stage = 1;

    if (Object.values(orderBody).length === 1) {
      res.status(400).send({ err: "Pedido Vazio" });
      return;
    }

    try {
      const status = await orderServices.register(clientId, orderBody, stage);
      res.status(200).send(status);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(req, res) {
    let id = req.params.id;

    const orderById = await orderServices.findOrderId(id);

    if (orderById) {
      const orderById = await orderServices.delete(id);
      res.status(200).json({ orderById });
    } else {
      res.status(404).json({});
    }
  }
}

module.exports = new OrderController();
