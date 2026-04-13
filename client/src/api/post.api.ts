// import { api } from '../lib/api'

// export interface Post {
//   id: number
//   slug: string
//   title: string
//   excerpt?: string
//   content: string
//   coverImage?: string
//   published: boolean
//   status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
//   author: {
//     id: number
//     username: string
//     avatar?: string
//   }
//   tags: { id: number; name: string; slug: string }[]
//   likesCount: number
//   commentsCount: number
//   isLiked?: boolean
//   isSaved?: boolean
//   createdAt: string
//   updatedAt: string
// }

// // ─── Public (no auth needed) ───────────────────────────
// export const getGlobalFeed = () =>
//   api.get<Post[]>('/posts/feed/global')

// export const getUserPosts = (username: string) =>
//   api.get<Post[]>(`/posts/user/${username}`)

// export const searchPosts = (query: string) =>
//   api.get<Post[]>('/posts/search', { params: { q: query } })

// export const getPostBySlug = (slug: string) =>
//   api.get<Post>(`/posts/${slug}`)

// // ─── Protected (requires login) ────────────────────────
// export const getYourFeed = () =>
//   api.get<Post[]>('/posts/feed')

// export const createPost = (data: Partial<Post>) =>
//   api.post<Post>('/posts', data)

// export const updatePost = (id: string, data: Partial<Post>) =>
//   api.patch<Post>(`/posts/${id}`, data)

// export const deletePost = (id: string) =>
//   api.delete(`/posts/${id}`)

// export const toggleLike = (id: string) =>
//   api.post(`/posts/${id}/like`)

// export const toggleSave = (postId: number) => {
//   return api.post(`/posts/${postId}/save`)
// }

import { api } from "../lib/api";

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  published: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  author: {
    id: number;
    username: string;
    avatar?: string;
  };
  tags: { id: number; name: string; slug: string }[];
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Public ───────────────────────────
export const getGlobalFeed = () => api.get<Post[]>("/posts/feed/global");

export const getUserPosts = (username: string) =>
  api.get<Post[]>(`/posts/user/${username}`);

export const getPostBySlug = (slug: string) => api.get<Post>(`/posts/${slug}`);

// ─── Protected ────────────────────────
export const getYourFeed = () => api.get<Post[]>("/posts/feed");

export const createPost = (data: Partial<Post>) =>
  api.post<Post>("/posts", data);

// ✅ FIXED → number
export const updatePost = (id: number, data: Partial<Post>) =>
  api.patch<Post>(`/posts/${id}`, data);

// ✅ FIXED → number
export const deletePost = (id: number) => api.delete(`/posts/${id}`);

// ✅ FIXED → number
export const toggleLike = (id: number) => api.post(`/posts/${id}/like`);

// ✅ already correct
export const toggleSave = (postId: number) => api.post(`/posts/${postId}/save`);

export const searchPost = (query: string, page = 1, limit = 10) =>
  api.get("/posts/search", {
    params: { q: query, page, limit },
  });
