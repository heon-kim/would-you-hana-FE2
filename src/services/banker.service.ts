import { request } from '../hoc/request';
import { config } from '../config/config';
import {BankerSignUpDto, BankerListReturnDTO} from '../types/dto/banker.dto';

const BASE_URL = config.apiUrl;
export const bankerService = {
  // 행원 회원가입 등록
  registerBanker: ( data: BankerSignUpDto) => {
    return request<void>({
      method: 'POST',
      url: `${BASE_URL}/bankers/signUp`,
      data,
    });
  },
  // 지역구 행원 목록 보기
  getBankerList: (location:string)=>{
    return request<BankerListReturnDTO[]>({
      method: 'GET',
      url: `${BASE_URL}/bankers/profileList`,
      params: location ? { location } : {}
    })
  }
}; 