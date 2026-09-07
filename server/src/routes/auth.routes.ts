import { Router } from "express";
import authController from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshAccessToken);
router.post("/logout", authController.logout);


router.get('/me', authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: 'You are authenticated!',
    user: (req as any).user
  });
});


export default router;
