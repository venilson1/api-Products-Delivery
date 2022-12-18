const Order = require("../models/Orders");
const thermalPrinter = require("../configs/thermalPrinter");

class OrderServices {
  async findOrders() {
    let orders = await Order.find()
      .select("clientId _id")
      .populate({
        path: "order",
        select: "name price",
      })
      .populate({
        path: "clientId",
        select: "name email adress complement reference telephone",
      });

    return orders;
  }

  async findOrderId(id) {
    //verificando id valido
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      try {
        let orderById = await Order.findById(id);
        return orderById;
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
  }

  async register(clientId, orderBody, stage) {
    const order = Object.assign({}, clientId, orderBody);
    order.stage = stage;

    const newOrder = new Order(order);
    let orders = await newOrder.save();

    thermalPrinter.printerOrder(orders);

    return orders;
  }

  async delete(id) {
    try {
      await Order.findByIdAndDelete(id);
      return { status: true };
    } catch (error) {
      return { status: false, error: "O Pedido não existe" };
    }
  }
}

module.exports = new OrderServices();
