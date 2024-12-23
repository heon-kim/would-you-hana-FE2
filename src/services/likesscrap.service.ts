import { config } from "../config/config";
import { request } from "../hoc/request";
import { ScrapQuestionRequestDTO, ScrapQuestionResponseDTO } from "../types/dto/likesscrap.dto";

const BASE_URL = config.apiUrl;

export const likesscrapService = {
    // 질문 스크랩
    scrapQuestion: (data: ScrapQuestionRequestDTO) => {
        return request<String>({
            method: 'POST',
            url: `${BASE_URL}/qna/scrap`,
            data
        });
    },
    // 스크랩한 qna 조회
    getScrapedQna: (customerId: number) => {
        return request<ScrapQuestionResponseDTO[]>({
            method: 'GET',
            url: `${BASE_URL}/my/qna/scrapList/${customerId}`
        });
    }
}