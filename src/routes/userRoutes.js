const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");
const authMiddleware = require("../middleware/auth");

router.get("/", UserController.getUsers);
// Protected routes
router.get("/profile", authMiddleware, UserController.getProfile);
router.put("/profile", authMiddleware, UserController.updateProfile);

module.exports = router;