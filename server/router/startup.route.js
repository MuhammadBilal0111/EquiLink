const express = require("express");
const StartupController = require("../controllers/Startup.controller.js");
const uploadMiddleware = require("../middlewares/multer.middleware.js");

const router = express.Router();

router.post(
  "/create-startup",
  uploadMiddleware,
  StartupController.createStartup
);
module.exports = router;
