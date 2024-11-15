import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { AuthActionTypes, LOGIN_SUCCESS, LOGOUT } from './actions';

// Define the initial state for authentication
interface AuthState {
    isAuthenticated: boolean;
    authToken: string | null;
    userEmail: string | null;
    userRole: string | null;
    userLocation: string[] | null;
}

// 초기 상태를 `localStorage`에서 불러오기
const initialAuthState: AuthState = {
    isAuthenticated: localStorage.getItem('authToken') === null ? false : true, // localStorage에 authToken이 있으면 true
    authToken: localStorage.getItem('authToken') || null,
    userEmail: localStorage.getItem('userEmail') || null,
    userRole: localStorage.getItem('userRole') || null,
    userLocation: localStorage.getItem('userLocation') || null,
};


// Auth reducer to handle authentication-related actions
const authReducer = (state = initialAuthState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case LOGIN_SUCCESS:

            // 로그인 성공 시, 각 값들이 올바르게 전달되는지 로그 확인
            console.log(action.payload);
            // localStorage에 올바르게 저장
            // localStorage.setItem('authToken', action.payload.token);
            // localStorage.setItem('userRole', action.payload.userRole);
            // localStorage.setItem('userEmail', action.payload.email);
            // localStorage.setItem('userLocation', action.payload.location);
            return {
                ...state,
                isAuthenticated: true,
                authToken: action.payload.token,
                userEmail: action.payload.userEmail,
                userRole: action.payload.userRole,
                userLocation: action.payload.location,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                authToken: null,
                userEmail: null,
                userRole: null,
                userLocation: null
            };
        default:
            return state;
    }
};

// Combine all reducers into a single rootReducer
const rootReducer = combineReducers({
    auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;


const store = configureStore({
    reducer: rootReducer,
});

export default store;

