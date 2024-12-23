const Product = require("../models/productSchema");

// Controller function to add a new product
exports.createProduct = async (req, res) => {
  try {
    // Destructure required fields from the request body
    const {
      name,
      description,
      category,
      brand,
      price,
      discountPrice,
      mainImage,
      galleryImages,
      averageRating,
      totalReviews,
      reviews,
    } = req.body;

    // Validate if required fields are present
    const requiredFields = [
      "name",
      "description",
      "category",
      "brand",
      "price",
      "mainImage",
    ];

    for (let field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          message: `Field "${field}" is required`,
        });
      }
    }

    // Create a new product instance
    const product = new Product({
      name,
      description,
      category,
      brand,
      price,
      discountPrice,
      mainImage,
      galleryImages,
      averageRating,
      totalReviews,
      reviews,
    });

    // Save the product to the database
    await product.save();

    // Send the response with the saved product
    res.status(201).json({
      message: "Product added successfully!",
      product,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      message: "Failed to add product",
      error: error.message,
    });
  }
};

// Controller function to get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

// Controller function to get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};
