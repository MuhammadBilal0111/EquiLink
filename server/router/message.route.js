const express = require("express");
const {
  authMiddleware,
} = require("../middlewares/auth.middleware.js");
const {
  getUsersForSidebar,
  sendMessage,
  getMessage,
  addUser,
} = require("../controllers/message.controller.js");

const router = express.Router();

router.post("/addUser/:id", authMiddleware, addUser);
router.get("/users", authMiddleware, getUsersForSidebar);
router.post("/send/:id", authMiddleware, sendMessage);
router.get("/:id", authMiddleware, getMessage);

module.exports = router;
