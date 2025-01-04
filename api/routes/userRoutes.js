const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");
const authMiddleware = require("../middleware/auth.js");

router.get("/profiles", UserController.getUsers);
router.get("/profiles/:id", UserController.getProfile);

// Protected routes
router.put("/profile", authMiddleware, UserController.updateProfile);

module.exports = router;