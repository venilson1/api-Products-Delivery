const reviewService = require("./reviewService");

class ReviewController {
  async findAll(req, res) {
    try {
      const data = await reviewService.findAll();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({error});
    }
  }

  async insert(req, res) {
    let { userId, productId, rating, title, body } = req.body;

    try {
      const data = await reviewService.insert(
        userId,
        productId,
        rating,
        title,
        body,
      );
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);

    }
  }

  async findByProduct(req, res){
    let id = req.params.id;

    if (id.match(/^[0-9a-fA-F]{24}$/) == null) return res.status(404).json({error: 'Id is not valid'});

    try{
      const data = await reviewService.findByProduct(id);
      if(data) return res.status(200).json(data);
      return res.status(404).json({error: "not found"});
    }catch(error){
      return res.status(500).json({error: 'internal server error'});
    }
  }


}

module.exports = new ReviewController();
