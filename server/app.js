require("express-async-errors");
const express = require("express");
const cors = require("cors");
const routes = require("./router/routes.js");
const errorMiddleware = require("./middlewares/error.middleware.js");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const allowedOrigins = "http://localhost:5173";
app.use(cors({ origin: allowedOrigins, credentials: true }));


app.use("/api",  routes);

app.get("/users", (req, res) => {
  res.json([{ name: "John Doee" }]);
});

app.use(errorMiddleware);

module.exports = app;
