import prisma from "../utils/prisma";
import ApiError from "../utils/ApiError";
import tagService from "./tag.service";  // Add import at top


export interface PostSummary {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  coverIamge: string | null;
  createdAt: Date;
}

export interface PostDetails extends PostSummary {
  content: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  published: boolean;
  author: {
    id: number;
    username: string;
    avatar: string | null;
  };
}
export interface PaginationPosts {
  posts: PostSummary[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
export interface CreatePostInput {
  title: string;
  content: string;
  excerpt?: string | null;
  coverIamge?: string | null;
  status?: "DRAFT" | "PUBLISHED";
  tags?: string[];  // ← ADD THIS
}


export interface UpdatePostInput {
  title?: string;
  content?: string;
  excerpt?: string | null;
  coverIamge?: string | null;
  status?: "DRAFT" | "PUBLISHED";
}

class PostService {
  async createPost(
  authorId: number,
  data: CreatePostInput
): Promise<PostDetails> {
  const { title, content, excerpt, coverIamge, status = "PUBLISHED", tags = [] } = data;

  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const slug = baseSlug;
  const published = status === "PUBLISHED";

  // Create post
  const post = await prisma.post.create({
    data: {
      title,
      content,
      excerpt: excerpt ?? null,
      coverIamge: coverIamge ?? null,
      status,
      published,
      slug,
      authorId,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverIamge: true,
      createdAt: true,
      content: true,
      status: true,
      published: true,
      author: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
  });

  // Handle tags if provided
  if (tags && tags.length > 0) {
    for (const tagSlug of tags) {
      const tag = await tagService.createOrFindTag(tagSlug);
      
      await prisma.postTags.create({
        data: {
          postId: post.id,
          tagId: tag.id,
        },
      });
    }
  }

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    coverIamge: post.coverIamge,
    createdAt: post.createdAt,
    content: post.content,
    status: post.status,
    published: post.published,
    author: post.author,
  };
}


  async getYourFeed(
    userId: number,
    page: number = 1,
    limit: number = 10
  ): Promise<{
    posts: PostSummary[];
    meta: { page: number; limit: number; total: number; totalPages: number };
  }> {
    const pageNum = Math.max(1, page);
    const skip = (pageNum - 1) * limit;

    // FIX 2: Parallel queries (2x faster)
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: {
          published: true,
          author: {
            followers: {
              some: {
                followerId: userId,
              },
            },
          },
        },
        include: {
          author: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.post.count({
        where: {
          published: true,
          author: {
            followers: {
              some: {
                followerId: userId,
              },
            },
          },
        },
      }),
    ]);

    const postsSummary: PostSummary[] = posts.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt ?? null,
      coverIamge: p.coverIamge,
      createdAt: p.createdAt,
      author: p.author,
    }));

    return {
      posts: postsSummary,
      meta: {
        page: pageNum,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getGlobalFeed(
  page: number = 1,
  limit: number = 10
): Promise<{
  posts: PostSummary[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}> {
  const pageNum = Math.max(1, page);
  const skip = (pageNum - 1) * limit;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: { likes: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.post.count({
      where: { published: true },
    }),
  ]);

  const postSummary: PostSummary[] = posts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt ?? null,
    coverIamge: p.coverIamge,  
    likesCount: p._count.likes,
    createdAt: p.createdAt,
    author: p.author,
  }));

  return {
    posts: postSummary,
    meta: {
      page: pageNum,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

  async getPostBySlug(slug: string): Promise<PostDetails> {
    const post = await prisma.post.findUnique({
      where: {
        slug,
      },
      include: {
        author: {
          select: { id: true, username: true, avatar: true },
        },
      },
    });
    if (!post || !post.published) {
      throw new ApiError(404, "Post not found");
    }
    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      coverIamge: post.coverIamge,
      createdAt: post.createdAt,
      status: post.published ? "PUBLISHED" : "DRAFT",
      published: post.published,
      author: post.author,
    };
  }

  async getUserPosts(
    username: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{
    posts: PostSummary[];
    meta: { page: number; limit: number; total: number; totalPages: number };
  }> {
    const pageNum = Math.max(1, page);
    const skip = (pageNum - 1) * limit;

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: {
          published: true,
          author: {
            username: username,
          },
        },
        include: {
          author: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.post.count({
        where: {
          published: true,
          author: {
            username: username,
          },
        },
      }),
    ]);
    const postSummary: PostSummary[] = posts.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt ?? null,
      coverIamge: p.coverIamge,
      createdAt: p.createdAt,
      author: p.author,
    }));
    return {
      posts: postSummary,
      meta: {
        page: pageNum,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updatePost(
    postId: number,
    authorId: number,
    data: UpdatePostInput
  ): Promise<PostDetails> {
    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      throw new ApiError(404, "Post not found");
    }

    if (post.authorId !== authorId) {
      throw new ApiError(403, "You can only edit your own posts");
    }

    // Update the post
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        coverIamge: data.coverIamge,
        status: data.status,
        published: data.status ? data.status === "PUBLISHED" : undefined,
      },
      include: {
        author: {
          select: { id: true, username: true, avatar: true },
        },
      },
    });
    return {
      id: updatedPost.id,
      title: updatedPost.title,
      slug: updatedPost.slug, // ✅ Added
      content: updatedPost.content,
      excerpt: updatedPost.excerpt,
      coverIamge: updatedPost.coverIamge,
      status: updatedPost.status,
      createdAt: updatedPost.createdAt, // ✅ Added
      published: updatedPost.published, // ✅ Added
      author: updatedPost.author, // ✅ Added
    };
  }

  async deletePost(postId: number, authorId: number): Promise<void> {
    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      throw new ApiError(404, "Post not found");
    }

    if (authorId !== post.authorId) {
      throw new ApiError(403, "You can only delete your own posts");
    }

    await prisma.post.delete({
      where: { id: postId },
    });
  }

  async toggleLike(
    postId: number,
    userId: number
  ): Promise<{ liked: boolean; likeCount: number }> {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new ApiError(404, "Post not found");
    }

    // Step 2: Check if user already liked this post
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    // Step 3: Toggle logic
    let liked: boolean;

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
      liked = false;
    } else {
      await prisma.like.create({
        data: { userId, postId },
      });
      liked = true;
    }
    const likeCount = await prisma.like.count({
      where: { postId },
    });
    return { liked, likeCount };
  }

  async toggleSave(postId: number, userId: number) {
  // 🔍 DEBUG (keep this for now)
  console.log("postId:", postId, "userId:", userId)

  // 1. Check post exists
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  })

  if (!post) {
    throw new Error("Post not found")
  }

  // 2. Check if already saved
  const existing = await prisma.savedPost.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  })

  // 3. If exists → UNSAVE
  if (existing) {
    await prisma.savedPost.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    })

    return {
      success: true,
      saved: false,
      message: "Post unsaved",
    }
  }

  // 4. Else → SAVE
  await prisma.savedPost.create({
    data: {
      userId,
      postId,
    },
  })

  return {
    success: true,
    saved: true,
    message: "Post saved",
  }
}


  async searchPosts(
  query: string,
  page: number = 1,
  limit: number = 10
): Promise<{
  posts: PostSummary[];
  meta: { page: number; limit: number; total: number; totalPages: number };
  query: string;
}> {
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: {
        published: true,
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",  // Case-insensitive search
            },
          },
          {
            content: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.post.count({
      where: {
        published: true,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { content: { contains: query, mode: "insensitive" } },
        ],
      },
    }),
  ]);

  const postsSummary: PostSummary[] = posts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt ?? null,
    coverIamge: p.coverIamge,
    createdAt: p.createdAt,
    author: p.author,
  }));

  return {
    posts: postsSummary,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    query,
  };
}

}

export default new PostService();
