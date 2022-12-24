const Order = require("./Order");
const thermalPrinter = require("../../configs/thermalPrinter");
const knex = require("../../database");

class OrderService {
  
  async findAll() {
    try {

      const data = await knex('orders').select('*');

      return data;
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const data = await knex('orders').select('id', 'status', 'total', 'is_payment', 'delivery', 'created_at').where({id});

      const products = await knex.raw(`
      SELECT products_orders.id, quantity, products.name, (quantity * price) AS total
      FROM orders
      INNER JOIN users ON orders.user_id = users.id
      INNER JOIN products_orders ON products_orders.order_id = orders.id
      INNER JOIN products ON products_orders.product_id = products.id
      WHERE orders.id = ${id}`);

      data[0].products = products.rows;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async insert(user_id, total, delivery) {

    try{
      const order = await knex('orders').insert({user_id, total, delivery}).returning('id');
      return order;
    } catch (error){
      throw error;
    }
  }

  async delete(id) {
    try{
      const data = await Admin.findByIdAndDelete(id);
      return data;
    }catch(error){
      throw error;
    }
  }


  async insertProductsOrders(order_id, products) {

    const fieldsToInsert = products.map(field => 
      ({ order_id, product_id: field.id, quantity: field.quantity })); 

    try{
      await knex('products_orders').insert(fieldsToInsert);
    } catch (error){
      throw error;
    }
  }
}

module.exports = new OrderService();
