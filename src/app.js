const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productsRoutes = require("./routes/productsRoutes");
const orderRoutes = require("./routes/orderRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./config/swaggerConfig");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", userRoutes);
app.use("/api", require("./routes/productsRoutes"));
app.use("/api", require("./routes/orderRoutes"));

// listening server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    "API documentation is available at http://localhost:5000/api-docs"
  );
});
