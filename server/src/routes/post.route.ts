import { Router } from "express";
import postController from "../controllers/post.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Public routes
router.get("/feed/global", postController.getGlobalFeed);
router.get("/user/:username", postController.getUserPosts);
router.get("/search", postController.searchPosts);  

// Protected routes
router.use(authMiddleware);

router.get("/feed", postController.getYourfeed);
router.post("/", postController.createPost);
router.patch("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.post("/:id/like", postController.toggleLike);
router.post("/:id/save", postController.toggleSave);

// Dynamic route (must be last)
router.get("/:slug", postController.getPostBySlug);

export default router;
