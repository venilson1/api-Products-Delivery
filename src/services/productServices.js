const Product = require("../models/Products");

class ProductServices {
  async findProducts() {
    let products = await Product.find();
    return products;
  }

  async findProductId(id) {
    //verificando id valido
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      try {
        let productById = await Product.findById(id);
        return productById;
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
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

  async update(id, name, description, price, promotion, discount, path) {
    const product = { name, description, price, promotion, discount, path };

    if (product != undefined) {
      let editProduct = {};

      if (name) {
        editProduct.name = name;
      }

      if (description) {
        editProduct.description = description;
      }

      if (price) {
        editProduct.price = price;
      }

      if (promotion) {
        editProduct.promotion = promotion;
      }

      if (discount) {
        editProduct.discount = discount;
      }

      if (path) {
        editProduct.path = path;
      }

      await Product.findByIdAndUpdate(id, { $set: editProduct });
      return { status: true };
    } else {
      return { status: false, error: "O produto não existe" };
    }
  }

  async delete(id) {
    try {
      await Product.findByIdAndDelete(id);
      return { status: true };
    } catch (error) {
      return { status: false, error: "O Produto não existe" };
    }
  }
}

module.exports = new ProductServices();
