const express = require("express");
const router = express.Router();
const {
  checkAuth,
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
router.get("/check-auth",authMiddleware,checkAuth)

module.exports = router;
