import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { AuthActionTypes, LOGIN_SUCCESS, LOGOUT } from './actions';

// Define the initial state for authentication
interface AuthState {
    isAuthenticated: boolean;
    authToken: string | null;
    userRole: string | null;
    userEmail: string | null;
    userLocation: string[] | null;
}

const initialAuthState: AuthState = {
    isAuthenticated: false,
    authToken: null,
    userRole: null,
    userEmail: null,
    userLocation: null
};

// Auth reducer to handle authentication-related actions
const authReducer = (state = initialAuthState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                authToken: action.payload.token,
                userRole: action.payload.role,
                userEmail: action.payload.email,
                userLocation: action.payload.location
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                authToken: null,
                userRole: null,
                userEmail: null,
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
