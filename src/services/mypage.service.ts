import { request } from '../hoc/request';
import { config } from '../config/config';
import { LikesScrapDTO } from '../types/dto/likesscrap.dto';

const BASE_URL = config.apiUrl;

export const myPageService = {
  // 스크랩한 게시물 목록 조회
  getScrapedPosts: (customerId: number) => {
    return request<LikesScrapDTO>({
      method: 'GET',
      url: `${BASE_URL}/mypage/getScrap/${customerId}`
    });
  },

  //좋아요한 게시물 목록 조회
  getLikedPosts: (customerId: number) => {
    return request<LikesScrapDTO>({
        method: 'GET',
        url: `${BASE_URL}/mypage/getLikes/${customerId}`
    });
  }
};
