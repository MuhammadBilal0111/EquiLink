const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User.controller.js");

// router.get(
//   "/get-user",
//   // authorize("admin"),
//   UserController.getUserById
// );
// router.get("/get-all-users", UserController.getAllUsers);
router.post(
  "/create-userProfile",
  // authorize("admin"),
  UserController.createUserProfile
);

router.get("/get-userProfile/:id?", UserController.getUserProfile);


// router.post("/create-user", UserController.createUser);
// router.patch(
//   "/update-user",
//   // authorize("admin"),
//   UserController.updateUser
// );
// router.delete(
//   "/delete-user/:id",
//   // authorize("admin"),
//   UserController.deleteUser
// );

module.exports = router;