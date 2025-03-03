const express = require("express");
const router = express.Router();
const {
  loginUser,
  signUpUser,
  changePassword,
  forgetPassword,
  resetPasswordWithToken,
} = require("../controllers/auth.controller.js");
const {
  authorize,
  authMiddleware,
} = require("../middlewares/auth.middleware.js");

router.post("/login", loginUser);
router.post("/signup", signUpUser);
router.post("/change-password", authMiddleware, changePassword);
router.post("/forgot-password", forgetPassword);
router.post("/reset-password", resetPasswordWithToken);

module.exports = router;
