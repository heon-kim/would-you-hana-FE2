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
  createdAt: string;
  answered: boolean;
  counts: Counts;
  images?: Image[];
}

export const Categories: string[] = [
  '예금/적금',
  '이체',
  '자산관리',
  '퇴직연금',
  '펀드',
  '신탁',
  'ISA',
  '전자금융',
  '대출',
  '외환',
  '보험',
  '카드',
  '기타',
];

export interface Comment {
  id: number;
  author: string;
  authorEmail: string;
  content: string;
  createdAt: string;
  certified: boolean;
  likes: number;
  liked: boolean;
}

export interface Reply {
  id: number;
  author: string;
  authorEmail: string;
  content: string;
  createdAt: string;
}

export interface AnswerInterface {
  id: number;
  authorEmail: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const CommunityCategories: string[] = [
  '저축',
  '소비',
  '주식',
  '청약',
  '연말정산',
  '절약',
  '노후 대비',
  '신용점수 올리기',
  '세금/납부',
  '학자금대출',
];