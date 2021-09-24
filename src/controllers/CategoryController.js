const categoryServices = require("../services/categoryServices");

class CategoryController {
  async index(req, res) {
    const allCategorys = await categoryServices.findCategories();

    res.send({
      allCategorys,
    });
  }

  async getCategoryById(req, res) {
    let id = req.params.id;
    const categoryById = await categoryServices.findCategoryId(id);

    if (categoryById == undefined) {
      res.status(404).json({});
    } else {
      res.status(200).json({ categoryById });
    }
  }

  async newCategory(req, res) {
    let title = req.body;
    let products;

    try {
      const status = await categoryServices.register(title, products);
      res.status(200).send(status);
    } catch (error) {
      console.log(error);
    }
  }

  async edit(req, res) {
    let id = req.params.id;
    let { title } = req.body;

    const categoryById = await categoryServices.findCategoryId(id);

    if (categoryById) {
      try {
        const categoryUpdated = await categoryServices.update(id, title);
        res.status(200).send(categoryUpdated);
      } catch (error) {
        console.log(error);
      }
    } else {
      res.status(404).json({});
    }
  }

  async remove(req, res) {
    let id = req.params.id;

    const categoryById = await categoryServices.findCategoryId(id);

    if (categoryById) {
      const categoryById = await categoryServices.delete(id);
      res.status(200).json({ categoryById });
    } else {
      res.status(404).json({});
    }
  }
}

module.exports = new CategoryController();
