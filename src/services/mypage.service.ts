import { request } from '../hoc/request';
import { config } from '../config/config';
import { LikesScrapDTO } from '../types/dto/likesscrap.dto';

const BASE_URL = config.apiUrl;

export const myPageService = {
  // 스크랩한 커뮤니티 게시물 목록 조회
  getScrapedPosts: (customerId: number) => {
    return request<LikesScrapDTO>({
      method: 'GET',
      url: `${BASE_URL}/my/post/scrapList/${customerId}`
    });
  },

  // 스크랩한 qna 게시물 목록 조회
  getScrapedQnas: (customerId: number) => {
    return request<LikesScrapDTO>({
      method: 'GET',
      url: `${BASE_URL}/my/qna/scrapList/${customerId}`
    });
  },

  //좋아요한 게시물 목록 조회
  getLikedPosts: (customerId: number) => {
    return request<LikesScrapDTO>({
        method: 'GET',
        url: `${BASE_URL}/my/post/likeList/${customerId}`
    });
  }
};
