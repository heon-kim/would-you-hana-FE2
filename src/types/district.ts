export interface DistrictData {
  name: string;
  keywords: string[];
  logo: string | null;
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
    rank: 1|2|3;
    name: string;
    level: string;
    activities: string;
    likes: string;
    bgColor: string;
    showFullProfile?: boolean;
  }>;
} 