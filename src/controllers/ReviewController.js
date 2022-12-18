const reviewService = require("../services/reviewService");

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
}

module.exports = new ReviewController();
