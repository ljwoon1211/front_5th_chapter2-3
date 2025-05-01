import { User } from "../../user/model";

export interface Post {
  id: number,
  title: string,
  userId: number,
  author?: User,
  tags?: string[];
  reactions?: {
    likes: number;
    dislikes: number;
    total: number;
  },
  body: string,
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export interface NewPost {
  title: string;
  body: string;
  userId: number;
}

export interface EditablePost {
  id: number;
  title?: string;
  body?: string;
  userId: number;
}

export interface PostFilterParams {
  skip: number;
  limit: number;
  search: string;
  tag: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export type SortOption = {
  value: string;
  label: string;
}