import { Request, Response, NextFunction } from "express";
import tagService from "../services/tag.service";

class TagController {
  // GET /api/tags - Get all tags
  async getAllTags(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tags = await tagService.getAllTags();

      res.json({
        success: true,
        data: tags,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/tags/:slug/posts - Get posts by tag
  async getPostsByTag(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { slug } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await tagService.getPostsByTag(slug, page, limit);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

}

export default new TagController();
