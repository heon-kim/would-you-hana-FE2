import { request } from '../hoc/request';
import { config } from '../config/config';
import { Banker } from '../types/user';

const BASE_URL = config.apiUrl;
export const bankerService = {
  // 행원 회원가입 등록
  registerBanker: ( data: Banker) => {
    return request<void>({
      method: 'POST',
      url: `${BASE_URL}/bankers/signUp`,
      data,
    });
  }
 
}; 