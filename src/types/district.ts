export interface DistrictData {
  name: string;
  keywords: string[];
  logo: string;
  isRegulationArea?: boolean;
  hotPosts: Array<{
    type: string;
    date: string;
    likes: string;
    views: string;
    content: string;
  }>;
  recentQna: Array<{
    type: string;
    date: string;
    likes: string;
    views: string;
    content: string;
  }>;
  topBankers: Array<{
    rank: '🥇' | '🥈' | '🥉';
    name: string;
    level: string;
    activities: string;
    likes: string;
    bgColor: string;
    showFullProfile?: boolean;
  }>;
} 