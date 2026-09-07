import prisma from "../utils/prisma";
import ApiError from "../utils/ApiError";

// Tag response
export interface TagWithCount {
  id: number;
  name: string;
  slug: string;
  postCount: number;
}

export interface TagBasic {
  id: number;
  name: string;
  slug: string;
}

// Updated CreatePostInput (add tags)
// interface CreatePostInput {
//   title: string;
//   content: string;
//   excerpt?: string;
//   coverImage?: string;
//   status?: "DRAFT" | "PUBLISHED";
//   tags?: string[]; // ← NEW: ["nodejs", "express", "typescript"]
// }

// Search response
// interface SearchResults {
//   posts: PostSummary[];
//   total: number;
//   query: string;
// }

class TagService {
  async getAllTags(): Promise<TagWithCount[]> {
    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: {
            postTags: true,
          },
        },
      },
      orderBy: {
        postTags: {
          _count: "desc",
        },
      },
    });
    return tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      postCount: tag._count.postTags,
    }));
  }

  async getPostsByTag(
    tagSlug: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{
    posts: any[];
    meta: { page: number; limit: number; total: number; totalPages: number };
    tag: TagBasic;
  }> {
    const skip = (page - 1) * limit;

    // Find tag
    const tag = await prisma.tag.findUnique({
      where: { slug: tagSlug },
    });

    if (!tag) {
      throw new ApiError(404, "Tag not found");
    }

    // Get posts with this tag
    const [postTags, total] = await Promise.all([
      prisma.postTags.findMany({
        where: {
          tagId: tag.id,
          post: {
            published: true, // ← Move filter here
          },
        },
        include: {
          post: {
            include: {
              author: {
                select: {
                  id: true,
                  username: true,
                  avatar: true,
                },
              },
            },
          },
        },
        skip,
        take: limit,
        orderBy: {
          post: {
            createdAt: "desc",
          },
        },
      }),
      prisma.postTags.count({
        where: {
          tagId: tag.id,
          post: {
            published: true,
          },
        },
      }),
    ]);

    const posts = postTags.map((pt) => ({
      id: pt.post.id,
      title: pt.post.title,
      slug: pt.post.slug,
      excerpt: pt.post.excerpt,
      coverImage: pt.post.coverIamge,
      createdAt: pt.post.createdAt,
      author: pt.post.author,
    }));

    return {
      posts,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      tag: {
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
      },
    };
  }

  // Helper: Create tag if doesn't exist, return existing if it does
  async createOrFindTag(slug: string): Promise<TagBasic> {
    const normalizedSlug = slug.toLowerCase().trim();
    
    // Capitalize first letter for name
    const name = normalizedSlug.charAt(0).toUpperCase() + normalizedSlug.slice(1);

    // Try to find existing tag
    let tag = await prisma.tag.findUnique({
      where: { slug: normalizedSlug },
    });

    // Create if doesn't exist
    if (!tag) {
      tag = await prisma.tag.create({
        data: {
          name,
          slug: normalizedSlug,
        },
      });
    }

    return {
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    };
  }

}

export default new TagService();
