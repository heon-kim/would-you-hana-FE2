import axios, { Method, AxiosResponse } from 'axios';
import { config } from '../config/config';

// JWT를 저장하고 프론트엔드의 다음 요청에 사용.
// 이를 위해 localstorage에서 JWT를 저장하고 읽도록 axios도우미 (axios_helper)를 다음과 같이 작성하였음.
// 이제 로그인 또는 회원가입이 완료되면, JWT를 저장함.


//로컬 스토리지에서 'auth_token'이라는 키로 저장된 JWT 토큰을 가져오는 함수
export const getAuthToken = (): string | null => {
    return window.localStorage.getItem('authToken');
};

//로컬 스토리지에서 'user_role'이라는 키로 저장된 사용자 역할을 가져오는 함수
export const getUserRole = (): string | null => {
    return window.localStorage.getItem('userRole');
};

//로컬 스토리지에서 'user_email'이라는 키로 저장된 사용자 이메일을 가져오는 함수
export const getUserEmail = (): string | null => {
    return window.localStorage.getItem('userEmail');
};

//로컬 스토리지에서 'userId'이라는 키로 저장된 사용자 이메일을 가져오는 함수
export const getUserId = (): string | null => {
    return window.localStorage.getItem('userId');
};

//로컬 스토리지에서 'userNickname'이라는 키로 저장된 사용자 이메일을 가져오는 함수
export const getUserNickname = (): string | null => {
    return window.localStorage.getItem('userNickname');
};

//로컬 스토리지에서 'userBranchName'이라는 키로 저장된 사용자 이메일을 가져오는 함수
export const getUserBranchName = (): string | null => {
    return window.localStorage.getItem('userBranchName');
};

//로컬 스토리지에서 'user_location'이라는 키로 저장된 사용자 위치를 가져오는 함수
export const getUserLocation= (): string | null =>{
    return window.localStorage.getItem('userLocation');
};
//로컬 스토리지에 JWT 토큰을 'auth_token' 키로 저장하는 함수
export const setAuthHeader = (token: string): void => {
    window.localStorage.setItem('authToken', token);
};

//로컬 스토리지에 사용자 역할을 'user_role' 키로 저장하는 함수
export const setUserRole = (role: string): void => {
    window.localStorage.setItem('userRole', role);
};

//로컬 스토리지에 닉네임을 'email' 키로 저장하는 함수
export const setUserEmail = (email: string):void => {
    window.localStorage.setItem('userEmail', email);
};

//로컬 스토리지에 위치를 'user_location' 키로 저장하는 함수
export const setUserLocation = (location: string):void=>{
    window.localStorage.setItem('user_location', location);
}

export const setBankerEmail = (email : string):void => {
    window.localStorage.setItem('bankerEmail', email);
}

export const setBankerBranch = (branchName : string):void => {
    window.localStorage.setItem('bankerBranchName', branchName);
}

export const getBankerEmail = (): string | null => {
    return window.localStorage.getItem('bankerEmail');
}

export const getBankerBranch = (): string | null =>{
    return window.localStorage.getItem('bankerBranchName');
};

interface RequestConfig {
    method: Method;    // HTTP method (e.g., 'GET', 'POST', etc.)
    url: string;       // API endpoint URL
    data?: unknown;        // Optional data to be sent in the request body
    headers?: Record<string, string>;  // headers 추가
    params?: Record<string, string>;  // params 추가
}


//axios의 기본 설정을 지정. 
//API 요청을 보낼 때 기본 URL을 'http://localhost:8080'(백 서버)으로 설정하고, 
//POST 요청의 Content-Type을 'application/json'으로 지정
axios.defaults.baseURL = config.apiUrl;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 로그인 성공시, getAuthToken()을 통해 로그인 정보를 가져오고, request틀을 만들어 준다.
export const request = async <T = unknown>({ method, url, data, headers, params }: RequestConfig): Promise<AxiosResponse<T>> => {
    const authToken = getAuthToken();
    const defaultHeaders: Record<string, string> = {};

    // 로그인된 유저라면, 빈 헤더에 토큰을 달아준다.
    if (authToken && authToken !== 'null' && authToken !== 'undefined') {
        defaultHeaders.Authorization = `Bearer ${authToken}`;
    }

    //여기서 백에 실제로 요청 보냄
    try {
        const response = await axios({
            method,
            url,
            headers: { ...defaultHeaders, ...headers },
            data,
            params: params
        });
        console.log('Response:', response);
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};