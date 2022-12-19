const Product = require("./Product");
const Review = require("./Review/Review");

class ProductService {

  async findAll() {
    try{
      const data = await Product.find();
      return data;
    }catch(error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const data = await Product.findById(id).select('-password -__v');
      return data;
    } catch (error) {
      throw error;
    }
  }

  async insert(name, description, price, promotion, discount, path) {
    
    const newProduct = new Product({
      name,
      description,
      price,
      promotion,
      discount,
      path,
    });
    try{
      const product = newProduct.save();
      return product;
    } catch (e){
      throw e;
    }
  }

  async update(id, name, description, price, promotion, discount, path) {

    try{
      const data = await Product.findByIdAndUpdate(id, { $set: {id, name, description, price, promotion, discount, path} });
      return data;
    }catch(error){
      throw error;
    }
  }

  async delete(id) {
    try{
      const data = await Product.findByIdAndDelete(id);
      return data;
    }catch(error){
      throw error;
    }
  }

  async findByIdAndReviews(id){
    try{
      const data = await Review.find({productId: id})   
      .populate({
        path: "userId",
        select: "name -_id",
    });
      return data;
    }catch(error){
      throw error;
    }
  }
}

module.exports = new ProductService();
