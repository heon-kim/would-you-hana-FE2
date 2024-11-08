import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField';
import UserTypeRadio from '../../components/UserTypeRadio';
import { findUser } from '../../utils/userStorage';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../hoc/actions';
import {
  getUserLocation,
  setAuthHeader,
  setUserEmail,
  setUserLocation,
  setUserRole,
} from '../../hoc/request';

const Login: React.FC = () => {
  const [userType, setUserType] = useState<'C' | 'B'>('C'); // 일반회원(customer: C) | 행원(banker: B)
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
      navigate('/');
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = findUser(email);
    if (!storedUser || email !== storedUser.email) {
      message.warning('존재하지 않는 회원입니다.');
      return;
    }

    if (password === storedUser.password) {
      localStorage.setItem('loggedUser', email);
      const token: string = 'generatedAuthToken'; // string 타입 지정
      const role: string = userType; // string 타입 지정
      const location: string[] = Array.isArray(storedUser.location)
        ? storedUser.location
        : [storedUser.location];
      dispatch(loginSuccess(token, role, email, location));
      setAuthHeader(token);
      setUserRole(role);
      setUserEmail(email);
      setUserLocation(location);
      message.success('로그인 성공!');

      // 지역에 따라 내비게이션 경로 설정 => 모든 구로 확장해야함
      if (location[0].includes('광진')) {
        navigate('/gwangjin');
      } else if (location[0].includes('서초')) {
        navigate('/seocho');
      } else if (location[0].includes('성동')) {
        navigate('/seongdong');
      } else if (location[0].includes('강남')) {
        navigate('/gangnam');
      } else {
        navigate('/');
      }
    } else {
      message.warning('비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center gap-10">
      <div className="w-96 p-8 flex flex-col gap-6  bg-white shadow-lg rounded-lg">
        <h2 className="text-lg text-bold text-center">WOULD YOU HANA</h2>
        <UserTypeRadio
          userType={userType}
          setUserType={setUserType}
          labels={{ customer: '일반 회원', banker: '행원' }}
        />
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <InputField
            htmlFor="email"
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
          <InputField
            htmlFor="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />
          <button
            type="submit"
            className="block p-2 bg-mainColor text-white rounded-md transition-colors duration-200 hover:bg-hoverColor"
          >
            로그인
          </button>
        </form>
      </div>
      <div className="flex justify-center w-full text-center gap-2 text-sm">
        <button onClick={() => navigate('/register')}>회원가입</button>
        <p>|</p>
        <button onClick={() => navigate('/findPassword')}>비밀번호 찾기</button>
      </div>
    </div>
  );
};

export default Login;
