const categoryService = require("../services/categoryService");

class CategoryController {
  async findAll(req, res) {
    try{
      const data = await categoryService.findAll();
      return res.status(200).json(data);
    }catch (error){
      return res.status(500).json({error: 'internal server error'});
    }
  }

  async findById(req, res) {
    let id = req.params.id;

    try{
      const data = await categoryService.findById(id);

      if(!data) return res.status(404).json({ error: 'not found' });
  
      return res.status(200).json(data);
    } catch (error){
      return res.status(404).json({error});
    }
  }

  async insert(req, res) {
    let { name } = req.body;

    if (!name) return res.status(400).send({ error: "name is invalid" });

    try {
      const data = await categoryService.insert(name);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const { name } = req.body;

    if (id.match(/^[0-9a-fA-F]{24}$/) == null) return res.status(404).json({error: 'Id is not valid'});

    try{
      const data = await categoryService.update(id, name);
      if(data) return res.status(200).json(data);
      return res.status(404).json({error: "not found"});
    }catch(error){
      return res.status(404).json({error});
    }
  }

  async delete(req, res) {
    let id = req.params.id;

    if (id.match(/^[0-9a-fA-F]{24}$/) == null) return res.status(404).json({error: 'Id is not valid'});

    try{
      const data = await categoryService.delete(id);
      if(data) return res.status(200).json();
      return res.status(404).json({error: "not found"});
    }catch(error){
      return res.status(500).json({error: 'internal server error'});
    }
  }
}

module.exports = new CategoryController();
