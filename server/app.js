require("express-async-errors");
const express = require("express");
const cors = require("cors");
const routes = require("./router/routes.js");
const errorMiddleware = require("./middlewares/error.middleware.js");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const allowedOrigins = "*";
app.use(cors({ origin: allowedOrigins }));
// Use routes
app.use("/api", routes);

// Sample route for testing
app.get("/users", (req, res) => {
  res.json([{ name: "John Doee" }]);
});

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;
