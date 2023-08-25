import express from "express";
import {
  getUserPosts,
  getFeedPosts,
  likePost,
} from "../controllers/postController.js";

const router = express.Router();

// ?READ
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

// ?UPDATE
router.patch("/:id/like", verifyToken, likePost);

export default router;
