import { Request, Response, NextFunction } from "express";
import postService from "../services/post.service";

interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

class PostController {
  // Public Routes
  async getGlobalFeed(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const feedGlobal = await postService.getGlobalFeed(page, limit);
      res.json(feedGlobal);
    } catch (error) {
      next(error);
    }
  }

  async getPostBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = req.params.slug;

      const post = await postService.getPostBySlug(slug);
      res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async getUserPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const username = req.params.username;

      const posts = await postService.getUserPosts(username, page, limit);
      res.json(posts);
    } catch (error) {
      next(error);
    }
  }

  // Protected Routes

  async getYourfeed(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user!.id;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const feed = await postService.getYourFeed(user, page, limit);
      res.json(feed);
    } catch (error) {
      next(error);
    }
  }

  async createPost(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      console.log("🔥 CONTROLLER: createPost HIT");
      console.log("req.user:", req.user);
      console.log("req.body:", req.body);

      const authorId = req.user!.id; // ← CRASHES HERE if req.user undefined!
      const data = req.body;

      console.log("Calling service...");
      const post = await postService.createPost(authorId, data);

      res.status(201).json(post);
    } catch (error) {
      console.log("❌ CONTROLLER ERROR:", error);
      next(error);
    }
  }

  async updatePost(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const authorId = req.user!.id;
      const postId = Number(req.params.id);
      const data = req.body;

      const updatedPost = await postService.updatePost(postId, authorId, data);

      res.status(200).json({ post: updatedPost });
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const authorId = req.user!.id;
      const postId = Number(req.params.id);

      await postService.deletePost(postId, authorId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
  async toggleLike(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const postId = Number(req.params.id);

      const result = await postService.toggleLike(postId, userId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async toggleSave(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const postId = Number(req.params.id);

      const result = await postService.toggleSave(postId, userId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async searchPosts(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const query = (req.query.q as string)?.trim();
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    if (!query) {
      res.status(400).json({
        success: false,
        message: "Search query is required",
      });
      return;
    }

    const result = await postService.searchPosts(query, page, limit);

    res.json({
      success: true,
      data: result.posts,   // 👈 cleaner
      meta: result.meta,    // 👈 for pagination later
    });
  } catch (error) {
    next(error);
  }
}
}

export default new PostController();
