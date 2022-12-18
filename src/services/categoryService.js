const Category = require("../models/Category");

class CategoryService {
  async findAll() {
    try{
      const data = await Category.find();
      return data;
    }catch(error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const data = await Category.findById(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async insert(name) {
    const newCategory = new Category({name});
    try {
      let data = await newCategory.save();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async update(id, name) {
    try{
      const data = await Category.findByIdAndUpdate(id, { $set: { id, name }});
      return data;
    } catch(error){
      throw error;
    }
  }

  async delete(id) {
    try{
      const data = await Category.findByIdAndDelete(id);
      return data;
    }catch(error){
      throw error;
    }
  }
}

module.exports = new CategoryService();
