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
