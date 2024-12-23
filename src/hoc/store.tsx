import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { AuthActionTypes, LOGIN_SUCCESS, LOGOUT, UPDATE_LOCATION, SET_INTEREST_LOCATIONS } from './actions';

// Define the initial state for authentication
interface AuthState {
    isAuthenticated: boolean;
    authToken: string | null;
    userId: number | null;
    userEmail: string | null;
    userRole: string | null;
    userLocation: string | null;
    nickname: string | null;
    branchName?: string;
    interestLocations: string[];
}

// 초기 상태를 `localStorage`에서 불러오기
const initialAuthState: AuthState = {
    isAuthenticated: localStorage.getItem('authToken') !== null,
    authToken: localStorage.getItem('authToken'),
    userId: Number(localStorage.getItem('userId')),
    userEmail: localStorage.getItem('userEmail'),
    userRole: localStorage.getItem('userRole'),
    userLocation: localStorage.getItem('userLocation'),
    nickname: localStorage.getItem('userNickname'),
    branchName: localStorage.getItem('userBranchName') || undefined,
    interestLocations: JSON.parse(localStorage.getItem('interestLocations') || '["성동구"]'),
};


// Auth reducer to handle authentication-related actions
const authReducer = (state = initialAuthState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                authToken: action.payload.token,
                userId: action.payload.userId,
                userEmail: action.payload.userEmail,
                userRole: action.payload.userRole,
                userLocation: action.payload.location,
                nickname: action.payload.nickname,
                branchName: action.payload.branchName,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                authToken: null,
                userId: null,
                userEmail: null,
                userRole: null,
                userLocation: '성동구',
                nickname: null,
                branchName: undefined,
            };
        case UPDATE_LOCATION:
            return {
                ...state,
                userLocation: action.payload
            };
        case SET_INTEREST_LOCATIONS:
            return {
                ...state,
                interestLocations: action.payload
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

