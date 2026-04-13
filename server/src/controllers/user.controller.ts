import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";

interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

class UserController {
  // GET /api/users/me
  async getMe(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const user = await userService.getCurrentUser(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  // PATCH /api/users/me
  async updateMe(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const data = req.body;
      const user = await userService.updateCurrentUser(userId, data);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/users/:username
  async getUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.params;
      const user = await userService.getUserByUsername(username);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  // POST /api/users/:username/follow
  async toggleFollow(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const followerId = req.user!.id;
      const { username } = req.params;

      // Get target user ID from username
      const targetUser = await userService.getUserByUsername(username);
      
      const result = await userService.toggleFollow(followerId, targetUser.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/users/:username/followers
  async getFollowers(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.params;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;

      const user = await userService.getUserByUsername(username);
      const followers = await userService.getFollowers(user.id, page, limit);
      res.json(followers);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/users/:username/following
  async getFollowing(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.params;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;

      const user = await userService.getUserByUsername(username);
      const following = await userService.getFollowing(user.id, page, limit);
      res.json(following);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
