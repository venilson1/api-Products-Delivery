const Reviews = require("../models/Reviews");

class ReviewsServices {
  async findReviews() {
    let reviews = await Reviews.find();
    return reviews;
  }

  async register(clientId, productId, rating, title, body, rated) {
    const newReviews = new Reviews({
      clientId,
      productId,
      rating,
      title,
      body,
      rated,
    });
    let reviews = newReviews.save();
    return reviews;
  }
}

module.exports = new ReviewsServices();
