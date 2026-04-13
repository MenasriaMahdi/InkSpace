import { api } from "../lib/api"

export type CommentAuthor = {
  id: number
  username: string
  avatar: string | null
}

export type Comment = {
  id: number
  content: string
  postId: number
  userId: number
  parentId: number | null
  createdAt: string
  updatedAt: string
  user: CommentAuthor
  replies?: Comment[]
  _count?: {
    replies: number
  }
}

export type CommentsResponse = {
  comments: Comment[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const getPostComments = (postId: number) =>
  api.get<CommentsResponse>(`/posts/${postId}/comments`)

export const createComment = (postId: number, content: string) =>
  api.post<Comment>(`/posts/${postId}/comments`, { content })

export const createReply = (commentId: number, content: string) =>
  api.post<Comment>(`/comments/${commentId}/replies`, { content })

export const updateComment = (commentId: number, content: string) =>
  api.patch<Comment>(`/comments/${commentId}`, { content })

export const deleteComment = (commentId: number) =>
  api.delete(`/comments/${commentId}`)