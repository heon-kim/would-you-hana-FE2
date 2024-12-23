import { request } from '../hoc/request';
import { config } from '../config/config';
import { CommunityAllResponseDTO, CommunityListDTO, CommunityResponseDTO } from '../types/dto/community.dto';

const BASE_URL = config.apiUrl;

export const communityService = {
    //커뮤니티 게시물 목록 불러오기
    getCommunityList:(location: string|null) => {
        return request<CommunityListDTO[]>({
            method: 'GET',
            url: `${BASE_URL}/post/postList`,
            params: location ? { location } : {}
        })
    },

    //커뮤니티 카테고리별 목록 불러오기
    getCommunityByCategory:(category: number, location: string|null) => {
        return request<CommunityListDTO[]>({
            method: 'GET',
            url: `${BASE_URL}/post/postList`,
            params: location ? { location } : {}
        })
    },

    //커뮤니티 상세 보기
    getCommunityDetail: (postId : number) => {
        return request<CommunityResponseDTO>({
            method: 'GET',
            url: `${BASE_URL}/post/${postId}`
        })
    },

    //커뮤니티 게시물 등록
    postCommunityPost: (data: FormData) => {
        return request<CommunityAllResponseDTO>({
            method: 'POST',
            url: `${BASE_URL}/post/register`,
            data,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    }
}