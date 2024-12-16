interface Counts {
  views: number;
  likes: number;
  comments: number;
  scraps: number;
}

interface Image {
  name: string;
  preview: string;
}

export interface Post {
  id: number;
  category: string;
  title: string;
  content: string;
  author: string;
  email: string;
  createdAt: string;
  answered: boolean;
  counts: Counts;
  images?: Image[];
}

export interface AnswerInterface {
  id: number;
  content: string;
  authorEmail: string | null;
  createdAt: string;
  updatedAt: string;
} 