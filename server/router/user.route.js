const express = require("express");
const UserController = require("../controllers/User.controller.js");
const uploadMiddleware = require("../middlewares/multer.middleware.js");
const {authMiddleware} = require('../middlewares/auth.middleware.js')

const router = express.Router();

router.post(
  "/create-userProfile",
  authMiddleware,
  uploadMiddleware,
  UserController.createUserProfile
);

router.get("/get-userProfile/:id?",authMiddleware, UserController.getUserProfile);
router.get("/get-all", UserController.getAllUsers);
router.patch("/update-userProfile", authMiddleware, UserController.updateUserProfile);

router.delete(
  "/delete-user",
  UserController.deleteUser
);

module.exports = router;
