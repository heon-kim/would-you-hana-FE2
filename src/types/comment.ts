export interface Comment {
  id: number;
  author: string;
  authorEmail: string;
  content: string;
  createdAt: string;
  certified: boolean;
  likes: number;
  liked: boolean;
  postId:number;
}

export interface Reply {
  id: number;
  author: string;
  authorEmail: string;
  content: string;
  createdAt: string;
} 