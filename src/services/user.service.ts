import { request } from '../hoc/request';
import { config } from '../config/config';
import { User } from '../types/user';

const BASE_URL = config.apiUrl;
export const userService = {
  // 일반회원 회원가입 등록
  registerUser: ( data: User) => {
    return request<void>({
      method: 'POST',
      url: `${BASE_URL}/members/signUp`,
      data,
    });
  },

  // 일반회원 관심지역 받아오기
  getInterestLocationList: (customer_id: string) => {
    return request<string[]>({
      method: 'GET',
      url: `${BASE_URL}/my/interestList`,
      params: customer_id ? {customer_id} : {}
    })
  }
 
}; 