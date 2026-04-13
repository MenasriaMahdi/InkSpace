import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { User } from "@prisma/client";
import prisma from "../utils/prisma";
import ApiError from "../utils/ApiError";
import { config } from "../config/env";

interface RegisterInput {
  email: string;
  username: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface TokenPayload {
  userId: number;
  email: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  private readonly saltRounds = 10;

  // 1) Helper to generate access + refresh tokens
  private generateTokens(userId: number, email: string): AuthTokens {
    const payload: TokenPayload = { userId, email };

    const accessToken = jwt.sign(
      payload,
      config.jwt.accessSecret as Secret,
      {
        expiresIn: config.jwt.accessExpiresIn,
      } as SignOptions
    );

    const refreshToken = jwt.sign(
      payload,
      config.jwt.refreshSecret as Secret,
      {
        expiresIn: config.jwt.refreshExpiresIn,
      } as SignOptions
    );

    return { accessToken, refreshToken };
  }

  // 2) Register new user
  async register(
    _data: RegisterInput
  ): Promise<{ user: Omit<User, "password">; tokens: AuthTokens }> {
    const { email, username, password } = _data;

    // 1. Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      throw new ApiError(400, "Email or username already exists");
    }

    // 2. Hash password
    const hashPassword = await bcrypt.hash(password, this.saltRounds);

    // 3. Create user in database
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashPassword,
      },
    });

    // 4. Generate tokens
    const tokens = this.generateTokens(user.id, user.email);

    // 5. Store refresh token in database

    await prisma.refreshToken.create({
      data: {
        token: tokens.refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    // 6. Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, tokens };
  }

  // 3) Login existing user
  async login(
    data: LoginInput
  ): Promise<{ user: Omit<User, "password">; tokens: AuthTokens }> {
    const { email, password } = data;
    // 1. Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    // 2. Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid!) {
      throw new ApiError(401, "Invalid credentials");

      // 3. Generate tokens
    }
    const tokens = this.generateTokens(user.id, user.email);
    // 4. Store refresh token in database

    await prisma.refreshToken.create({
      data: {
        token: tokens.refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });
    // 5. Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, tokens };
  }

  // 4) Refresh access token from refresh token
  async refreshAccessToken(
    refreshToken: string
  ): Promise<{ accessToken: string }> {
    try {
      // 1. Verify refresh token signature
      const decoded = jwt.verify(
        refreshToken,
        config.jwt.refreshSecret
      ) as TokenPayload;

      // 2. Check if token exists in database and is valid
      const storedToken = await prisma.refreshToken.findFirst({
        where: {
          token: refreshToken,
          userId: decoded.userId,
          revoked: false,
          expiresAt: { gt: new Date() },
        },
      });

      if (!storedToken) {
        throw new ApiError(401, "Invalid or expired refresh token");
      }

      // 3. Generate new access token
      const accessToken = jwt.sign(
        { userId: decoded.userId, email: decoded.email },
        config.jwt.accessSecret as Secret,
        { expiresIn: config.jwt.accessExpiresIn } as SignOptions
      );

      return { accessToken };
    } catch (error) {
      throw new ApiError(401, "Invalid or expired refresh token");
    }
  }

  // 5) Logout (revoke refresh token)
  async logout(refreshToken: string): Promise<void> {
    await prisma.refreshToken.updateMany({
      where: { token: refreshToken },
      data: { revoked: true },
    });
  }
}

export default new AuthService();
