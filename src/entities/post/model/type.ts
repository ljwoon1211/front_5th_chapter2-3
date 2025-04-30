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
  },
  body: string,
}