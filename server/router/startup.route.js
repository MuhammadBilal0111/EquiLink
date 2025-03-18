const express = require("express");
const StartupController = require("../controllers/Startup.controller.js");
const uploadMiddleware = require("../middlewares/multer.middleware.js");

const router = express.Router();

router.post(
  "/create-startup",
  uploadMiddleware,
  StartupController.createStartup
);

router.get("/get-all-startups", StartupController.getAllStartups);


module.exports = router;
