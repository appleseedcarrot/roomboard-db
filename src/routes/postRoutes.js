const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const postController = require("../controllers/postController.js");

// Public
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostByID);
// Protected routes
router.post("/", authMiddleware, postController.createPost);
router.put("/:id", authMiddleware, postController.updatePost);
router.delete("/:id", authMiddleware, postController.deletePost);

module.exports = router;