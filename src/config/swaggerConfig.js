// Swagger configuration
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce webapp APIs",
      version: "1.0.0",
      description:
        "API documentation for user registration, login, and password reset",
    },
  },
  apis: [path.join(__dirname, "../routes/userRoutes.js")],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
