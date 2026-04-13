import { api } from '../lib/api'
import type { Post } from './post.api'

export interface User {
  id: number
  username: string
  email: string
  bio?: string
  avatar?: string
  role: 'USER' | 'ADMIN'
  createdAt: string
  _count: {
    posts: number
    followers: number
    following: number
  }
}

export const getCurrentUser = () =>
  api.get<User>('/users/me')

export const getUserByUsername = (username: string) =>
  api.get<User>(`/users/${username}`)

export const updateCurrentUser = (data: Partial<Pick<User, 'bio' | 'avatar' | 'username'>>) =>
  api.patch<User>('/users/me', data)

export const getUserPosts = (username: string) =>
  api.get<Post[]>(`/posts/user/${username}`)

export const toggleFollow = (username: string) =>
  api.post(`/users/${username}/follow`)

export const getFollowers = (username: string) =>
  api.get<User[]>(`/users/${username}/followers`)

export const getFollowing = (username: string) =>
  api.get<User[]>(`/users/${username}/following`)

