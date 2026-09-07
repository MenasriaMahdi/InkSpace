import ApiError from "../utils/ApiError";
import prisma from "../utils/prisma";

export interface UserProfile {
  id: number;
  username: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
  postCount: number;
  isFollowing?: boolean;
  _count?: {
    posts?: number;
    followers?: number;
    following?: number;
  };
}

export interface UpdateUserInput {
  username?: string;
  email?: string;
  bio?: string;
  avatar?: string | null;
}

class UserService {
  async getCurrentUser(userId: number): Promise<UserProfile> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        bio: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            posts: {
              where: {
                published: true,
              },
            },
            followers: true,
            following: true,
          },
        },
      },
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const { _count, ...userData } = user;
    return {
      ...userData,
      postCount: _count.posts,
      _count,
    };
  }

  async getUserByUsername(username: string, currentUserId?: number): Promise<UserProfile> {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        bio: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            posts: {
              where: { published: true },
            },
            followers: true,
            following: true,
          },
        },
      },
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    let isFollowing = false;
    if (currentUserId && user.id !== currentUserId) {
      const follow = await prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId: currentUserId,
            followingId: user.id,
          },
        },
      });
      isFollowing = Boolean(follow);
    }

    const { _count, ...userData } = user;
    return {
      ...userData,
      postCount: _count.posts,
      _count,
      isFollowing,
    };
  }

  async updateCurrentUser(
    userId: number,
    data: UpdateUserInput
  ): Promise<UserProfile> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data,
        select: {
          id: true,
          username: true,
          email: true,
          bio: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              posts: {
                where: { published: true },
              },
            },
          },
        },
      });

      const { _count, ...userData } = updatedUser;

      return {
        ...userData,
        postCount: _count.posts,
      };
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "P2002") {
        throw new ApiError(409, "Username already taken");
      }

      throw error; // Let other errors bubble up
    }
  }

  async getFollowers(
    userId: number,
    page: number = 1,
    limit: number = 20
  ): Promise<{
    followers: UserProfile[];
    meta: { page: number; limit: number; total: number; totalPages: number };
  }> {
    const skip = (page - 1) * limit;

    const [followers, total] = await Promise.all([
      prisma.follow.findMany({
        where: { followingId: userId },
        include: {
          follower: {
            select: {
              id: true,
              username: true,
              bio: true,
              avatar: true,
              createdAt: true,
              updatedAt: true,
              _count: {
                select: {
                  posts: { where: { published: true } },
                },
              },
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.follow.count({
        where: { followingId: userId },
      }),
    ]);

    const followersList = followers.map((f) => ({
      ...f.follower,
      postCount: f.follower._count.posts,
    }));

    return {
      followers: followersList,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getFollowing(
    userId: number,
    page: number = 1,
    limit: number = 20
  ): Promise<{
    following: UserProfile[];
    meta: { page: number; limit: number; total: number; totalPages: number };
  }> {
    const skip = (page - 1) * limit;

    const [following, total] = await Promise.all([
      prisma.follow.findMany({
        where: { followerId: userId },
        include: {
          following: {
            select: {
              id: true,
              username: true,
              bio: true,
              avatar: true,
              createdAt: true,
              updatedAt: true,
              _count: {
                select: {
                  posts: { where: { published: true } },
                },
              },
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.follow.count({
        where: { followerId: userId },
      }),
    ]);

    const followingList = following.map((f) => ({
      ...f.following,
      postCount: f.following._count.posts,
    }));

    return {
      following: followingList,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async toggleFollow(
    followerId: number,
    followingId: number
  ): Promise<{ following: boolean; followersCount: number }> {
    // Prevent self-follow
    if (followerId === followingId) {
      throw new ApiError(400, "Cannot follow yourself");
    }

    // Check if target user exists
    const targetUser = await prisma.user.findUnique({
      where: { id: followingId },
    });

    if (!targetUser) {
      throw new ApiError(404, "User not found");
    }

    // Check if already following
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    let following: boolean;

    if (existingFollow) {
      // UNFOLLOW
      await prisma.follow.delete({
        where: { id: existingFollow.id },
      });
      following = false;
    } else {
      // FOLLOW
      await prisma.follow.create({
        data: {
          followerId,
          followingId,
        },
      });
      following = true;
    }

    // Get updated follower count
    const followersCount = await prisma.follow.count({
      where: { followingId },
    });

    return { following, followersCount };
  }
  async getUserStats(userId: number): Promise<{
  postsCount: number;
  followersCount: number;
  followingCount: number;
  likesReceived: number;
}> {
  const [postsCount, followersCount, followingCount, likesReceived] = await Promise.all([
    prisma.post.count({
      where: { authorId: userId, published: true },
    }),
    prisma.follow.count({
      where: { followingId: userId },
    }),
    prisma.follow.count({
      where: { followerId: userId },
    }),
    prisma.like.count({
      where: {
        post: {
          authorId: userId,
        },
      },
    }),
  ]);

  return {
    postsCount,
    followersCount,
    followingCount,
    likesReceived,
  };
}


  // async verifyUserOwnership(
  //   userId: number,
  //   targetUserId: number
  // ): Promise<void> {
  //   if (userId !== targetUserId) {
  //     throw new ApiError(403, "Access denied");
  //   }
  // }
}

export default new UserService();
