import { Request, Response, NextFunction } from "express";
import commentService from "../services/comment.service";

interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

class CommentController {
  // POST /api/posts/:postId/comments
  async createComment(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const postId = Number(req.params.postId);
      const { content } = req.body;

      const comment = await commentService.createComment(userId, {
        content,
        postId,
      });

      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  }

  // POST /api/comments/:commentId/replies
  async createReply(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const parentId = Number(req.params.commentId);
      const { content, postId } = req.body;

      const reply = await commentService.createComment(userId, {
        content,
        postId,
        parentId,
      });

      res.status(201).json(reply);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/posts/:postId/comments
  async getPostComments(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = Number(req.params.postId);
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;

      const result = await commentService.getPostComments(postId, page, limit);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  // PATCH /api/comments/:commentId
  async updateComment(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const commentId = Number(req.params.commentId);
      const { content } = req.body;

      const updatedComment = await commentService.updateComment(
        commentId,
        userId,
        { content }
      );

      res.json(updatedComment);
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/comments/:commentId
  async deleteComment(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const commentId = Number(req.params.commentId);

      await commentService.deleteComment(commentId, userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new CommentController();
