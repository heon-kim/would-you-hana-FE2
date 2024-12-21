import { request } from '../hoc/request';
import { config } from '../config/config';
import { User, InterestLocationRequestDTO  } from '../types/user';

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
  },

  // 일반회원 관심지역 삭제하기
  deleteSpecificInterestLocation: (data: InterestLocationRequestDTO) => {
    return request<string[]>({
      method: 'DELETE',
      url: `${BASE_URL}/my/delete/interest`,
      data,
    })
  },

  // 일반 회원 관심지역 추가하기
  addSpecificInterestLocation: (data: InterestLocationRequestDTO) => {
    return request<string[]>({
      method: 'POST',
      url: `${BASE_URL}/my/add/interest`,
      data,
    })
  },
 
}; 