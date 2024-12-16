export interface LoginSuccessPayload {
  token: string;
  userEmail: string;
  userRole: string;
  location: string;
  nickname?: string;
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
  userEmail: string,
  userRole: string,
  location: string,
  nickName: string,
): LoginSuccessAction => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('userEmail', userEmail);
  localStorage.setItem('userRole', userRole);
  localStorage.setItem('userLocation', location);
  localStorage.setItem('nickName', nickName);
  return {
    type: LOGIN_SUCCESS,
    payload: { token, userEmail, userRole, location }
  };
};

export const logout = (): LogoutAction => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userLocation');
  localStorage.removeItem('nickName');
  return {
    type: LOGOUT
  };
};













