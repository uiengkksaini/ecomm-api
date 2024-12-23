const mongoose = require("mongoose");

// Reviews schema
const reviewSchema = new mongoose.Schema({
  reviewerName: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  reviewDate: { type: Date, default: Date.now },
});

// Product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  mainImage: { type: String, required: true },
  galleryImages: [{ type: String }],
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  reviews: [reviewSchema],
});

// Create a Product model from the schema
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
