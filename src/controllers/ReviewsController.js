const reviewService = require("../services/reviewService");

class ReviewController {
  async index(req, res) {
    const reviews = await reviewService.findReviews();
    res.send({
      reviews,
    });
  }

  async newReviews(req, res) {
    let clientId = "61401d412d7e392bdccaf266";
    let rated = false;
    let { productId, rating, title, body } = req.body;

    try {
      const status = await reviewService.register(
        clientId,
        productId,
        rating,
        title,
        body,
        rated
      );
      res.status(200).send(status);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ReviewController();
