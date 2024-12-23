import { userService } from '../services/user.service';

export interface LoginSuccessPayload {
    token: string;
    userEmail: string;
    userId: number;
    userRole : string;
    location: string;
    nickname: string;
    branchName?: string; // 행원일 경우 지점명
    interestLocations?: string[];
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const SET_INTEREST_LOCATIONS = 'SET_INTEREST_LOCATIONS';

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: LoginSuccessPayload;
}

interface LogoutAction {
  type: typeof LOGOUT;
  payload: boolean;
}

interface UpdateLocationAction {
  type: typeof UPDATE_LOCATION;
  payload: string;
}

interface SetInterestLocationsAction {
  type: typeof SET_INTEREST_LOCATIONS;
  payload: string[];
}

export type AuthActionTypes = LoginSuccessAction | LogoutAction | UpdateLocationAction | SetInterestLocationsAction;

export const loginSuccess = (
  token: string, 
  userId: number,
  userEmail: string,
  userRole: string, 
  location: string,
  nickname: string,
  branchName?: string,
  interestLocations?: string[]
): LoginSuccessAction => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('userId', userId.toString());
  localStorage.setItem('userEmail', userEmail);
  localStorage.setItem('userRole', userRole);
  localStorage.setItem('userLocation', location);
  localStorage.setItem('userNickname', nickname);
  if (branchName) {
    localStorage.setItem('userBranchName', branchName);
  }
  if (interestLocations) {
    localStorage.setItem('interestLocations', JSON.stringify(interestLocations));
  }
  return {
    type: LOGIN_SUCCESS,
    payload: { token, userEmail, userId, userRole, location, branchName, nickname, interestLocations }
  };
};

export const logout = (): LogoutAction => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.setItem('userLocation', '성동구');
    localStorage.removeItem('userNickname');
    localStorage.removeItem('userBranchName');
    localStorage.removeItem('interestLocations');
    return {
        type: LOGOUT,
        payload: true
    };
};

export const updateLocation = (location: string): UpdateLocationAction => ({
  type: UPDATE_LOCATION,
  payload: location
});

  // 현재 지역 업데이트
  export const updateLocationWithApi = (location: string) => async (dispatch: any) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        const response = await userService.getCustomerInfo(Number(userId));
        const customerInfo = response.data;
  
        await userService.updateCustomerInfo({
          password: 'root1234',
          nickname: customerInfo.nickname,
          birthDate: customerInfo.birthDate,
          gender: customerInfo.gender,
          phone: customerInfo.phone,
          location: location
        }, Number(userId));
  
        dispatch(updateLocation(location));
      } catch (error) {
        console.error('Failed to update location:', error);
      }
    }
  };

export const setInterestLocations = (locations: string[]): SetInterestLocationsAction => {
  localStorage.setItem('interestLocations', JSON.stringify(locations));
  return {
    type: SET_INTEREST_LOCATIONS,
    payload: locations
  };
};













