const express = require("express");
const StartupController = require("../controllers/Startup.controller.js");
const uploadMiddleware = require("../middlewares/multer.middleware.js");
const { authMiddleware } = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.post(
  "/create-startup",
  uploadMiddleware,
  StartupController.createStartup
);

router.get("/get-all-startups", StartupController.getAllStartups);

router.patch(
  "/update-startup", StartupController.updateStartups
);


module.exports = router;
