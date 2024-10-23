import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField';
import UserTypeRadio from '../../components/UserTypeRadio';
import { findUser } from '../../utils/userStorage';
import { message } from 'antd';

const Login: React.FC = () => {
  const [userType, setUserType] = useState<'C' | 'B'>('C'); // 일반회원(customer: C) | 행원(banker: B)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
      message.success('로그인 성공!');
      navigate('/');
    } else {
      message.warning('비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-96 p-8 flex flex-col gap-6  bg-white shadow-lg rounded-lg">
        <h2 className="text-lg text-bold text-center">WOULD YOU HANA</h2>
        <UserTypeRadio
          userType={userType}
          setUserType={setUserType}
          labels={{ custormer: '일반 회원', banker: '행원' }}
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
            className="block p-2 bg-mainColor text-white rounded-md"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
