const mongoose = require("mongoose");

// Order Schema
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      pricePerItem: { type: Number, required: true },
      totalPrice: {
        type: Number,
        required: true,
        // You might want to auto-calculate totalPrice
        default: function () {
          return this.quantity * this.pricePerItem;
        },
      },
    },
  ],
  orderDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered"],
    default: "Pending",
  },
  totalAmount: {
    type: Number,
    required: true,
    // You might want to auto-calculate totalAmount as well
    default: function () {
      return this.items.reduce((sum, item) => sum + item.totalPrice, 0);
    },
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },
  paymentId: { type: String },
});

// Pre-save hook to recalculate `totalAmount` before saving the order
orderSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce((sum, item) => sum + item.totalPrice, 0);
  next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
