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
