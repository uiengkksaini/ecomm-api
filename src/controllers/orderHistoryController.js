const Order = require("../models/orderSchema");

exports.getOrderHistory = async (req, res) => {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Find all orders by the user
    const orders = await Order.find({ user: userId }).sort({ orderDate: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    // Find all orders
    const orders = await Order.find({}).sort({ orderDate: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
