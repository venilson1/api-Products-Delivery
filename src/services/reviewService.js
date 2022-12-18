const Review = require("../models/Review");

class ReviewService {
  async findAll() {
    try{
      let data = await Review.find();
      return data;
    }
    catch(error){
      throw error;
    }
  }

  async insert(userId, productId, rating, title, body) {
    try {
      const newReview = new Review({
        userId,
        productId,
        rating,
        title,
        body,
      });
      let review = newReview.save();
      return review;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ReviewService();
