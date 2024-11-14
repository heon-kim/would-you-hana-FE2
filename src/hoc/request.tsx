import axios, { Method, AxiosResponse } from 'axios';

// JWT를 저장하고 프론트엔드의 다음 요청에 사용.
// 이를 위해 localstorage에서 JWT를 저장하고 읽도록 axios도우미 (axios_helper)를 다음과 같이 작성하였음.
// 이제 로그인 또는 회원가입이 완료되면, JWT를 저장함.


//로컬 스토리지에서 'auth_token'이라는 키로 저장된 JWT 토큰을 가져오는 함수
export const getAuthToken = (): string | null => {
    return window.localStorage.getItem('auth_token');
};

//로컬 스토리지에서 'user_role'이라는 키로 저장된 사용자 역할을 가져오는 함수
export const getUserRole = (): string | null => {
    return window.localStorage.getItem('user_role');
};

//로컬 스토리지에서 'user_email'이라는 키로 저장된 사용자 이메일을 가져오는 함수
export const getUserEmail = (): string | null => {
    return window.localStorage.getItem('user_email');
};

//로컬 스토리지에서 'user_location'이라는 키로 저장된 사용자 위치를 가져오는 함수
export const getUserLocation= (): string[] =>{
    const location = window.localStorage.getItem('user_location');
    return location ? JSON.parse(location) : null;
};

//로컬 스토리지에 JWT 토큰을 'auth_token' 키로 저장하는 함수
export const setAuthHeader = (token: string): void => {
    window.localStorage.setItem('auth_token', token);
};

//로컬 스토리지에 사용자 역할을 'user_role' 키로 저장하는 함수
export const setUserRole = (role: string): void => {
    window.localStorage.setItem('user_role', role);
};

//로컬 스토리지에 닉네임을 'email' 키로 저장하는 함수
export const setUserEmail = (email: string):void => {
    window.localStorage.setItem('user_email', email);
};

//로컬 스토리지에 위치를 'user_location' 키로 저장하는 함수
export const setUserLocation = (location: string[]):void=>{
    window.localStorage.setItem('user_location', JSON.stringify(location));
}

interface RequestConfig {
    method: Method;    // HTTP method (e.g., 'GET', 'POST', etc.)
    url: string;       // API endpoint URL
    data?: unknown;        // Optional data to be sent in the request body
}


//axios의 기본 설정을 지정. 
//API 요청을 보낼 때 기본 URL을 'http://localhost:8080'(백 서버)으로 설정하고, 
//POST 요청의 Content-Type을 'application/json'으로 지정
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 로그인 성공시, getAuthToken()을 통해 로그인 정보를 가져오고, request틀을 만들어 준다.
export const request = async <T = unknown>({ method, url, data }: RequestConfig): Promise<AxiosResponse<T>> => {
    // 로그인되지 않은 유저라면, 헤더에 토큰을 달아주지 않는다.
    let headers: Record<string, string> = {};

    const authToken = getAuthToken();
    console.log('Token:', authToken);

    // 로그인된 유저라면, 빈 헤더에 토큰을 달아준다.
    if (authToken && authToken !== 'null' && authToken !== 'undefined') {
        headers = { Authorization: `Bearer ${authToken}` };
    }

    //여기서 백에 실제로 요청 보냄
    try {
        const response = await axios({
            method,
            url,
            headers,
            data,
        });
        console.log('Response:', response);
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

interface SignInData {
    email: string;
    password: string;
}

interface SignInResponse {
    grantType: string;
    accessToken: string;
    refreshToken: string;
}

// 로그인 함수: 서버에 로그인 요청 보내고 토큰 저장하기
export const signIn = async ({ email, password }: SignInData): Promise<AxiosResponse<SignInResponse>> => {
    try {
        const response = await axios.post<SignInResponse>(
            '/members/sign-in',
            { email, password },
            {
                headers: {
                    'Content-Type': 'application/json', // Content-Type 명시
                },
            }
        );
        
        // 서버로부터 토큰이 정상적으로 도착했으면 로컬 스토리지에 저장
        if (response.data) {
            const { grantType, accessToken, refreshToken } = response.data;

            // 로컬 스토리지에 JWT와 리프레시 토큰 저장
            localStorage.setItem('auth_token', `${grantType} ${accessToken}`);
            localStorage.setItem('refresh_token', refreshToken);

            console.log('로그인 성공: 토큰 저장 완료');
        }

        return response;
    } catch (error) {
        console.error('로그인 요청 실패:', error);
        throw error;
    }
};
