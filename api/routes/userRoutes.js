const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");
const authMiddleware = require("../middleware/auth.js");
// For form data
const multer = require('multer');
const upload = multer();

router.get("/profiles", UserController.getUsers);
router.get("/profiles/:id", UserController.getProfile);

// Protected routes
router.put("/profile", authMiddleware, upload.fields([
    { name: 'firstName' },
    { name: 'lastName' },
    { name: 'bio' },
    { name: 'profilePicture' }
]), UserController.updateProfile);

module.exports = router;