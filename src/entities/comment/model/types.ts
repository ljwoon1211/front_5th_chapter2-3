import { User } from "../../user/model";

export interface Comment {
  id: number;
  body: string;
  postId: number;
  userId: number;
  user?: User;
  likes?: number;
}

export interface CommentsResponse {
  comments: Comment[];
  total: number;
  skip?: number;
  limit?: number;
}

export interface NewComment {
  body: string;
  postId: number;
  userId: number;
}

export interface EditableComment {
  id: number;
  body?: string;
  likes?: number;
}