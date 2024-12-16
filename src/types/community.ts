export interface CommunityReply {
  id: number;
  author: string;
  content: string;
  replies: CommunityReply[];
}

export interface CommunityComment {
  id: number;
  author: string;
  content: string;
  replies: CommunityReply[];
}

export interface CommunityPost {
  id: number;
  category: string;
  title: string;
  content: string;
  author: string;
  views: number;
  likes: number;
  scraps: number;
  image: boolean;
  comments: CommunityComment[];
} 