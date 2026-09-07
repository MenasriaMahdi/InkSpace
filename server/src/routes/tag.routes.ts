import { Router } from "express";
import tagController from "../controllers/tag.controller";

const router = Router();

// GET /api/tags - Get all tags
router.get("/", tagController.getAllTags);

// GET /api/tags/:slug/posts - Get posts by tag
router.get("/:slug/posts", tagController.getPostsByTag);

export default router;
