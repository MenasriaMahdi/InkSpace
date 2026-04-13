import prisma from "../utils/prisma";
import ApiError from "../utils/ApiError";

export interface CommentWithAuthor {
  id: number;
  content: string;
  postId: number;
  userId: number;
  parentId: number | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    username: string;
    avatar: string | null;
  };
  replies?: CommentWithAuthor[];
  _count?: {
    replies: number;
  };
}

export interface CreateCommentInput {
  content: string;
  postId: number;
  parentId?: number | null;
}

export interface UpdateCommentInput {
  content: string;
}

class CommentService {
  async createComment(
    userId: number,
    data: CreateCommentInput
  ): Promise<CommentWithAuthor> {
    const { content, postId, parentId } = data;

    // 1. Verify post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new ApiError(404, "Post not found");
    }

    // 2. If it's a reply, verify parent comment exists
    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId },
      });

      if (!parentComment) {
        throw new ApiError(404, "Parent comment not found");
      }

      // 3. Ensure parent belongs to same post
      if (parentComment.postId !== postId) {
        throw new ApiError(400, "Parent comment belongs to different post");
      }
    }

    // 4. Create comment
    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId,
        parentId: parentId || null,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            replies: true,
          },
        },
      },
    });

    return comment;
  }

  async getPostComments(
    postId: number,
    page: number = 1,
    limit: number = 20
  ): Promise<{
    comments: CommentWithAuthor[];
    meta: { page: number; limit: number; total: number; totalPages: number };
  }> {
    const skip = (page - 1) * limit;

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where: {
          postId,
          parentId: null,
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
          replies: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  avatar: true,
                },
              },
              _count: {
                select: {
                  replies: true,
                },
              },
            },
            orderBy: { createdAt: "asc" }, // Oldest replies first
          },
          _count: {
            select: {
              replies: true,
            },
          },
        },
        orderBy: { createdAt: "desc" }, // Newest comments first
        skip,
        take: limit,
      }),
      prisma.comment.count({
        where: {
          postId,
          parentId: null,
        },
      }),
    ]);

    return {
      comments,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateComment(
    commentId: number,
    userId: number,
    data: UpdateCommentInput
  ): Promise<CommentWithAuthor> {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new ApiError(404, "Comment not found");
    }

    if (comment.userId !== userId) {
      throw new ApiError(403, "You can only edit your own comments");
    }

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: {
        content: data.content,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            replies: true,
          },
        },
      },
    });

    return updatedComment;
  }
  // 4. DELETE COMMENT
  async deleteComment(commentId: number, userId: number): Promise<void> {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new ApiError(404, "Comment not found");
    }

    if (comment.userId !== userId) {
      throw new ApiError(403, "You can only delete your own comments");
    }

    // Cascade delete handles replies automatically
    await prisma.comment.delete({
      where: { id: commentId },
    });
  }
}
export default new CommentService();
