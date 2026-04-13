import { Router } from "express";
import commentController from "../controllers/comment.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Public route - get comments
router.get("/posts/:postId/comments", commentController.getPostComments);

// Protected routes - require auth
router.post(
  "/posts/:postId/comments",
  authMiddleware,
  commentController.createComment
);

router.post(
  "/comments/:commentId/replies",
  authMiddleware,
  commentController.createReply
);

router.patch(
  "/comments/:commentId",
  authMiddleware,
  commentController.updateComment
);

router.delete(
  "/comments/:commentId",
  authMiddleware,
  commentController.deleteComment
);

export default router;
