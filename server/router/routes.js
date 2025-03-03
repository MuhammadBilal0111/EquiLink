const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth.middleware.js");
// const userRoutes = require("./user.route.js");
// const userProfileRoutes = require("./userprofile.route.js");
const authRoutes = require("./auth.route.js");

router.use("/auth", authRoutes);
// router.use("/users", authMiddleware, userRoutes);
// router.use("/user-profiles", authMiddleware, userProfileRoutes);


module.exports = router;