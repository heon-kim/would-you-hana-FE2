import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './hoc/store';
import { getAuthToken, getUserRole, getUserEmail,getUserLocation } from './hoc/request';
import { loginSuccess } from './hoc/actions';

const storedAuthToken = getAuthToken(); //로컬스토리지에서 토큰이 있으면 가져옴
const userRole = getUserRole(); //로컬스토리지에서 해당 유저의 역할 가져옴(banker, customer 여부)
const userEmail = getUserEmail(); // 로컬스토리지에서 해당 유저의 이메일을 가져옴(범용적으로 사용될 여지 존재)
const userLocation = getUserLocation();
// const localStorageCleared = localStorage.getItem('localStorageCleared'); //로컬 스토리지에서 클리어되었는지 여부 가져옴

// if (!localStorageCleared) {
//   //만약 로컬 스토리지가 비워져있지 않다면(서버 재시작하면 클리어되어있지 않음),f5누르면 index.js로 다시오는데, 로그인 된 상태에서는 localStoragecleared가 true여도 storedToken이 있기 때문에 store에 로그인 상태로 다시 세팅 명령 시킬 수 있음
//   localStorage.clear(); //로컬스토리지를 비우고
//   localStorage.setItem('localStorageCleared', 'true'); //로컬 스토리지가 비워졌다고 명시
// }

if (storedAuthToken) {
  //저장된 토큰이 있다면 로그인완료 상태로 디스패치 -> f5누르면 index.js로 다시 오는데, 이거 때문에 로그인 상태가 유지되는 것임

  // 저장된 토큰과 역할로 로그인 액션 디스패치
  const role = userRole || ''; // null인 경우 빈 문자열을 할당
  const email = userEmail || ''; // 동일하게 userEmail도 처리
  const location = userLocation || '';
  store.dispatch(loginSuccess(storedAuthToken, email, role, location));
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
