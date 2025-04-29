export interface Post {
  id: number,
  title: string,
  author: {
    id: number;
    username: string;
    image: string;
  },
  tags?: string[];
  reactions?: {
    likes: number;
    dislikes: number;
  };
}