const Product = require("../models/Products");

class ProductServices {
  async findProducts() {
    let products = await Product.find();
    return products;
  }

  async create(name, description, price, promotion, discount, path) {
    const newProduct = new Product({
      name,
      description,
      price,
      promotion,
      discount,
      path,
    });
    let product = newProduct.save();
    return product;
  }
}

module.exports = new ProductServices();
