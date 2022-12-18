const Review = require("../models/Review");

class ReviewService {
  async findAll() {
    let reviews = await Review.find();
    return reviews;
  }

  async insert(clientId, productId, rating, title, body, rated) {
    const newReview = new Review({
      clientId,
      productId,
      rating,
      title,
      body,
      rated,
    });
    let review = newReview.save();
    return review;
  }
}

module.exports = new ReviewService();
