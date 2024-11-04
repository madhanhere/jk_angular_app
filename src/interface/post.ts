import { User } from './user';

export interface Post {
  id: string;
  createdAt: string;
  content: string;
  isDeleted: boolean;
  title: string;
  updatedAt: string;
  user?: User
}

export interface PostList {
  posts: any,
  totalItems: number,
  totalPages: number,
  currentPage: number,
}
