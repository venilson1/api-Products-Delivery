const Category = require("../models/Categories");

class CategoryServices {
  async findCategories() {
    let categories = await Category.find();
    return categories;
  }

  async findCategoryId(id) {
    //verificando id valido
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      try {
        let categoryById = await Category.findById(id);
        return categoryById;
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
  }

  async register(title, products) {
    const newCategory = new Category(title, products);
    let categories = await newCategory.save();
    return categories;
  }

  async update(id, title) {
    if (category != undefined) {
      let editCategory = {};

      if (title) {
        editCategory.title = title;
      }

      await Category.findByIdAndUpdate(id, { $set: editCategory });
      return { status: true };
    } else {
      return { status: false, error: "A Categoria não existe" };
    }
  }

  async delete(id) {
    try {
      await Category.findByIdAndDelete(id);
      return { status: true };
    } catch (error) {
      return { status: false, error: "A Categoria não existe" };
    }
  }
}

module.exports = new CategoryServices();
