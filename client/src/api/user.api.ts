import { api } from '../lib/api'
import type { PaginatedPosts } from './post.api'

export interface User {
  id: number
  username: string
  email: string
  bio?: string | null
  avatar?: string | null
  role?: 'USER' | 'ADMIN'
  createdAt?: string
  isFollowing?: boolean
  isVerified?: boolean
  postCount?: number
  _count?: {
    posts?: number
    followers?: number
    following?: number
  }
}

export interface FollowersResponse {
  followers: User[]
  meta?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface FollowingResponse {
  following: User[]
  meta?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const getCurrentUser = () =>
  api.get<User>('/users/me')

export const getUserByUsername = (username: string) =>
  api.get<User>(`/users/${username}`)

export const updateCurrentUser = (data: Partial<Pick<User, 'bio' | 'avatar' | 'username'>>) =>
  api.patch<User>('/users/me', data)

export const getUserPosts = (username: string) =>
  api.get<PaginatedPosts>(`/posts/user/${username}`)

export const toggleFollow = (username: string) =>
  api.post<{ following: boolean; followersCount: number }>(`/users/${username}/follow`)

export const getFollowers = (username: string) =>
  api.get<FollowersResponse>(`/users/${username}/followers`)

export const getFollowing = (username: string) =>
  api.get<FollowingResponse>(`/users/${username}/following`)
