export interface LoginSuccessPayload {
    token: string;
    role: string;
    email: string;
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: LoginSuccessPayload;
}

interface LogoutAction {
    type: typeof LOGOUT;
}

export type AuthActionTypes = LoginSuccessAction | LogoutAction;

export const loginSuccess = (token: string, role: string, email: string): LoginSuccessAction => {
    return {
        type: LOGIN_SUCCESS,
        payload: { token, role, email }
    };
};

export const logout = (): LogoutAction => {
    return {
        type: LOGOUT
    };
};













