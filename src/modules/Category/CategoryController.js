const categoryService = require("./categoryService");

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

      if(!data.length) return res.status(404).json({ error: 'not found' });
  
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
    } catch (error){
      return res.status(500).json({error});
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const { name } = req.body;

    try{
      const data = await categoryService.update(id, name);

      if(data == 0) return res.status(404).json({ error: 'not found' });

      return res.status(200).json(data);
    }catch(error){
      return res.status(404).json({error});
    }
  }

  async delete(req, res) {
    let id = req.params.id;

    try{
      const data = await categoryService.delete(id);
      if(data) return res.status(200).json();
      return res.status(404).json({error: "not found"});
    }catch(error){
      return res.status(500).json({error});
    }
  }
}

module.exports = new CategoryController();
