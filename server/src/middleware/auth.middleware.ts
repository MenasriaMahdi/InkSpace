import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import { config } from "../config/env";

interface JwtPayload {
  userId: number;
  email: string;
  iat: number;
  exp: number;
}

export const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  // 1. Get Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new ApiError(401, "No authorization token provided"));
  }

  // 2. Extract token from "Bearer <token>"
  const [schema, token] = authHeader.split(" ");

  if (schema !== "Bearer" || !token) {
    return next(new ApiError(401, "Invalid authorization format."));
  }

  try {
    const decoded = jwt.verify(token, config.jwt.accessSecret) as JwtPayload;

    (req as any).user = {
      id: decoded.userId,
      email: decoded.email,
    };
    next();
  } catch (error) {
    return next(new ApiError(401, "Invalid or expired token"));
  }
};

export const optionalAuthMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next();
  }

  const [schema, token] = authHeader.split(" ");
  if (schema !== "Bearer" || !token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, config.jwt.accessSecret) as JwtPayload;
    (req as any).user = {
      id: decoded.userId,
      email: decoded.email,
    };
  } catch {
    // Ignore invalid tokens for optional auth
  }

  next();
};
