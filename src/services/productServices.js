const Product = require('../models/Products');

class ProductServices {

  async findProducts() {
    let products = await Product.find();
    return products;
  }

  async create(name, description, price) {
    const newProduct = new Product({ name, description, price });
    let product = await newProduct.save();
    return product;
  }
}

module.exports = new ProductServices();