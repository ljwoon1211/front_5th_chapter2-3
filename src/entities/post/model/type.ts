import { User } from "../../user/model";

export interface Post {
  id: number,
  title: string,
  userId: number,
  author: User,
  tags?: string[];
  reactions?: {
    likes: number;
    dislikes: number;
    total: number;
  },
  body: string,
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