const Order = require("./Order");
const thermalPrinter = require("../../configs/thermalPrinter");

class OrderService {
  
  async findByDate(date) {
    try {
      const data = await Order.find({
        createdAt: {
            $gte: `${date}T00:00:00.000Z`, 
            $lt: `${date}T23:59:59.999Z`
        }
    }).populate({
      path: 'products.id',
      select: "name price"
    }).populate({
      path: "user",
      select: "name email adress complement reference telephone"
    });

    var newData = [];

    data.forEach(el => {
      var obj = {products : []};
      obj._id = el._id
      obj.user = el.user
      obj.status = el.status
      obj.isPayment = el.isPayment
      obj.delivery = el.delivery
      obj.createdAt = el.createdAt
      el.products.forEach(pro => {
        const { _id, name, price} = pro.id;
        let quantity = pro.quantity;
        obj.products.push({ _id, name, price, quantity });
        obj.total = obj.products.map(sum => sum.price * sum.quantity);
      });
      obj.total = obj.total.reduce(function(soma, i) {
        return soma + i;
    });
      newData.push(obj);
    });

      return newData;
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const data = await Order.findById(id).select('-__v');
      return data;
    } catch (error) {
      throw error;
    }
  }

  async insert(user, products, delivery) {

    const newOrder = new Order({ user, products, delivery });
    try{
      const order = await newOrder.save();
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
}

module.exports = new OrderService();
