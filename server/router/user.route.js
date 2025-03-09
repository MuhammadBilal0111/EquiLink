const express = require("express");
const UserController = require("../controllers/User.controller.js");
const uploadMiddleware = require("../middlewares/multer.middleware.js");

const router = express.Router();

router.post(
  "/create-userProfile",
  uploadMiddleware,
  UserController.createUserProfile
);

router.get("/get-userProfile/:id?", UserController.getUserProfile);
router.patch("/update-userProfile", UserController.updateUserProfile);

module.exports = router;
