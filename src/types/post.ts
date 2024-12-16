// interface Counts {
//   viewCount: number;
//   likeCount: number;
//   commentCount: number;
//   scrapCount: number;
// }

interface Image {
  name: string;
  preview: string;
}

export interface Post {
  answerBanker: string;
  categoryId: number;
  categoryName: string;
  title: string;
  createdAt: string;
  location: string;
  customerId: number;
  images?: Image[];
  questionId: number;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  scrapCount: number;
}

export interface AnswerInterface {
  id: number;
  content: string;
  authorEmail: string | null;
  createdAt: string;
  updatedAt: string;
} 