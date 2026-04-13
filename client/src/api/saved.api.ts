import { api } from "../lib/api";

export type SavedPost = {
  id: number;
  postId: number;
  userId: number;
  createdAt: string;
  post: {
    id: number;
    title: string;
    slug: string;
    coverImage?: string;
  };
};

export const toggleSave = (postId: number) => {
  return api.post(`/posts/${postId}/save`)
}


