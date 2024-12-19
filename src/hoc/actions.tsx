export interface LoginSuccessPayload {
    token: string;
    userEmail: string;
    userId: number;
    userRole : string;
    location: string;
    nickname: string;
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

export const loginSuccess = (
  token: string, 
  userId: number,
  userEmail: string,
  userRole: string, 
  location: string,
  nickname: string,
): LoginSuccessAction => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('userId', userId.toString());
  localStorage.setItem('userEmail', userEmail);
  localStorage.setItem('userRole', userRole);
  localStorage.setItem('userLocation', location);
  localStorage.setItem('userNickname', nickname);
  return {
    type: LOGIN_SUCCESS,
    payload: { token, userEmail, userId, userRole, location, nickname }
  };
};

export const logout = (): LogoutAction => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userLocation');
    localStorage.removeItem('userNickname');
    return {
        type: LOGOUT
    };
};













