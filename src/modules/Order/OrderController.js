const orderService = require("./orderService");

class OrderController {
  
  async findByDate(req, res) {
    let date = req.params.date;

    if(!date) date = new Date().toISOString().substr(0, 10).split('-').join('-');

    try{
      const data = await orderService.findByDate(date);
      return res.status(200).json(data);
    }catch (error){
      return res.status(500).json({error: 'internal server error'});
    }
  }

  async findById(req, res) {
    let id = req.params.id;

    try{
      const data = await orderService.findById(id);

      if(!data) return res.status(404).json({ error: 'not found' });
  
      return res.status(200).json(data);
    } catch (error){
      return res.status(404).json({error});
    }
  }

  async insert(req, res) {
    const { user, products, delivery } = req.body;

    try {
      const data = await orderService.insert(user, products, delivery);
      res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    if (id.match(/^[0-9a-fA-F]{24}$/) == null) return res.status(404).json({error: 'Id is not valid'});

    try{
      const data = await orderService.delete(id);
      if(data) return res.status(200).json();
      return res.status(404).json({error: "not found"});
    }catch(error){
      return res.status(500).json({error: 'internal server error'});
    }
  }
}

module.exports = new OrderController();
