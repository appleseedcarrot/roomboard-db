const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const authMiddleware = require("../middleware/auth.js");

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);

module.exports = router;