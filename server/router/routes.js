const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth.middleware.js");
const userRoutes = require("./user.route.js");
const authRoutes = require("./auth.route.js");
const startupRoutes = require("./startup.route.js");
const categoryRoutes = require("./category.route.js")

router.use("/auth", authRoutes);
router.use("/users", authMiddleware, userRoutes);
router.use("/startups", authMiddleware, startupRoutes);
router.use("/categories", authMiddleware, categoryRoutes);

module.exports = router;
