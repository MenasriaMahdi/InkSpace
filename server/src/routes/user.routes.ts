import { Router } from "express";
import userController from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Protected routes (require auth)
router.get("/me", authMiddleware, userController.getMe);
router.patch("/me", authMiddleware, userController.updateMe);

// Public routes
router.get("/:username", userController.getUserProfile);
router.get("/:username/followers", userController.getFollowers);
router.get("/:username/following", userController.getFollowing);

// Protected follow route
router.post("/:username/follow", authMiddleware, userController.toggleFollow);

export default router;