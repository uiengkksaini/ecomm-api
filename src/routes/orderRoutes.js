const express = require("express");
const { checkout } = require("../controllers/checkoutController");
const {
  getAllOrders,
  getOrderHistory,
} = require("../controllers/orderHistoryController");
const { verifyToken } = require("../middlewares/authMiddlewares");

const router = express.Router();

/**
 * @swagger
 * /checkout-payments:
 *   post:
 *     summary: Checkout and Payments
 *     description: Allows a user to checkout after verifying the token.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentMethod:
 *                 type: string
 *                 example: "Credit Card"
 *               shippingAddress:
 *                 type: string
 *                 example: "123 Main St, City, Country"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: "abc123"
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       200:
 *         description: Checkout successful.
 *       400:
 *         description: Invalid request data.
 */
router.post("/checkout-payments", verifyToken, checkout);

/**
 * @swagger
 * /order-history:
 *   get:
 *     summary: Get order history
 *     description: Fetches the order history of the authenticated user.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved order history.
 *       401:
 *         description: Unauthorized, authentication required.
 *       500:
 *         description: Internal server error.
 */
router.get("/order-history", verifyToken, getOrderHistory);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     description: Fetches all orders for the authenticated user.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all orders.
 *       401:
 *         description: Unauthorized, authentication required.
 *       500:
 *         description: Internal server error.
 */
router.get("/orders", verifyToken, getAllOrders);

module.exports = router;
