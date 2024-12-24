const express = require("express");
const productController = require("../controllers/productController");
const { verifyToken } = require("../middlewares/authMiddlewares");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: API to manage products
 */


/**
 * @swagger
 * /products/add:
 *   post:
 *     summary: Add a new product (admin only)
 *     description: Adds a new product to the database. Requires admin authentication.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Smartphone"
 *               description:
 *                 type: string
 *                 example: "A high-end smartphone"
 *               category:
 *                 type: string
 *                 example: "Electronics"
 *               brand:
 *                 type: string
 *                 example: "BrandName"
 *               price:
 *                 type: number
 *                 example: 699
 *               discountPrice:
 *                 type: number
 *                 example: 599
 *               mainImage:
 *                 type: string
 *                 example: "https://example.com/main-image.jpg"
 *               galleryImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *               averageRating:
 *                 type: number
 *                 example: 4.5
 *               totalReviews:
 *                 type: number
 *                 example: 120
 *               reviews:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     reviewerName:
 *                       type: string
 *                       example: "John Doe"
 *                     rating:
 *                       type: number
 *                       example: 5
 *                     comment:
 *                       type: string
 *                       example: "Great product!"
 *                     reviewDate:
 *                       type: string
 *                       format: date
 *                       example: "2024-12-25"
 *     responses:
 *       201:
 *         description: Product successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product added successfully!"
 *                 product:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     category:
 *                       type: string
 *                     brand:
 *                       type: string
 *                     price:
 *                       type: number
 *                     discountPrice:
 *                       type: number
 *                     mainImage:
 *                       type: string
 *                     galleryImages:
 *                       type: array
 *                       items:
 *                         type: string
 *                     averageRating:
 *                       type: number
 *                     totalReviews:
 *                       type: number
 *                     reviews:
 *                       type: array
 *                       items:
 *                         type: object
 *       400:
 *         description: Bad request (missing required fields)
 *       403:
 *         description: Forbidden (insufficient permissions)
 *       500:
 *         description: Internal server error
 */
router.post("/products/add", verifyToken, productController.createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Retrieves a list of all products.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   category:
 *                     type: string
 *                   brand:
 *                     type: string
 *                   price:
 *                     type: number
 *                   discountPrice:
 *                     type: number
 *                   mainImage:
 *                     type: string
 *                   galleryImages:
 *                     type: array
 *                     items:
 *                       type: string
 *                   averageRating:
 *                     type: number
 *                   totalReviews:
 *                     type: number
 *                   reviews:
 *                     type: array
 *                     items:
 *                       type: object
 *       500:
 *         description: Internal server error
 */
router.get("/products", verifyToken, productController.getAllProducts); // Changed to GET for fetching products

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     description: Retrieves a single product by its ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Single product data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 category:
 *                   type: string
 *                 brand:
 *                   type: string
 *                 price:
 *                   type: number
 *                 discountPrice:
 *                   type: number
 *                 mainImage:
 *                   type: string
 *                 galleryImages:
 *                   type: array
 *                   items:
 *                     type: string
 *                 averageRating:
 *                   type: number
 *                 totalReviews:
 *                   type: number
 *                 reviews:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get("/products/:id", verifyToken, productController.getProductById); // Changed to GET for fetching single product

module.exports = router;
