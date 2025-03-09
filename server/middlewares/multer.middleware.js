// multer.middleware.js
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "cnicFrontImage", maxCount: 1 },
  { name: "cnicBackImage", maxCount: 1 }
]);