const Order = require("../models/orderSchema");
const Product = require("../models/productSchema");
const User = require("../models/userSchema");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const checkout = async (req, res) => {
  try {
    const { userId, items, paymentMethodId } = req.body;

    // Validate that the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Calculate total amount and validate product availability
    let totalAmount = 0;
    const orderItems = [];
    console.log(items);

    for (const item of items) {
      const product = await Product.findById(item.product);
      console.log(product);
      if (!product) {
        return res
          .status(400)
          .json({ error: `Product ${item.product} not found` });
      }

      const totalPrice = item.quantity * item.pricePerItem;
      totalAmount += totalPrice;

      // Add item to order
      orderItems.push({
        product: item.product,
        quantity: item.quantity,
        pricePerItem: item.pricePerItem,
        totalPrice: totalPrice,
      });
    }

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Amount in cents
      currency: "usd",
      payment_method: paymentMethodId ||'pm_card_visa',
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    // Create the order
    const newOrder = new Order({
      user: userId,
      items: orderItems,
      totalAmount: totalAmount,
      status: "Pending", // Default status
      paymentStatus: "Paid",
      paymentId: paymentIntent.id,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Respond with the created order
    res.status(201).json({
      message: "Order placed and payment successful",
      order: savedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { checkout };
