const Order = require("../models/Orders");

class OrderServices {
  async findOrders() {
    let orders = await Order.find();
    return orders;
  }

  async register(clientId, order) {
    const newOrder = new Order({ clientId, order });
    let orders = newOrder.save();
    return orders;
  }
}

module.exports = new OrderServices();
