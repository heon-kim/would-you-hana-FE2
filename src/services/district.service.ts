import { request } from '../hoc/request';
import { config } from '../config/config';
import { QnaListDTO } from '../types/dto/question.dto';
import { CommunityListDTO } from '../types/dto/community.dto';

const BASE_URL = config.apiUrl;

export const districtService = {
    // 지역구별 가장 최근에 작성된 qna 3개 반환
    getLatest3Questions: (location: string) => {
        return request<QnaListDTO[]>({
            method: 'GET',
            url: `${BASE_URL}/district/${location}/recentQna`,
        });
    },
    // 지역구별 조회수 많은 (커뮤니티)게시물 3개 반환
    getLatest3Post: (location: string) => {
        return request<CommunityListDTO[]>({
            method: 'GET',
            url: `${BASE_URL}/district/${location}/hotPost`,
        });
    },
}