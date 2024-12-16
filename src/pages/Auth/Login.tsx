import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findBanker } from '../../utils/userStorage';
import { message, Radio, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../hoc/actions';
import store from '../../hoc/store';
import { AxiosResponse } from 'axios';
import { request } from '../../hoc/request'

interface loginForm {
  email: string;
  password: string;
}

interface SignInReturnDto {
  token: string;
  email: string;
  role: string;
  location: string;
}

const Login: React.FC = () => {
  const [userType, setUserType] = useState<'C' | 'B'>('C'); // 일반회원(customer: C) | 행원(banker: B)
  const navigate = useNavigate();
  const dispatch = useDispatch<typeof store.dispatch>();

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser');
    const loggedBanker = localStorage.getItem('loggedBanker');
    if (loggedUser || loggedBanker) {
      navigate('/');
    }
  }, [navigate]);

  const handleUserLogin = async (values: loginForm) => {
    const { email, password } = values;

    try {
      // 백엔드로 로그인 요청 보내기
      const response: AxiosResponse<SignInReturnDto> = await request({
        method: 'POST',
        url: 'http://localhost:8080/members/signIn',
        data: { email, password }
      });
      const { token, email: returnedEmail, role, location } = response.data;

      if (token && location) {
        // Redux 상태 업데이트
        console.log('Dispatching loginSuccess with:', {
          token: token,
          email: returnedEmail,
          role: role,
          location: location,
        });
        dispatch(loginSuccess(token, email, role, location));

        // 메시지 및 네비게이션 처리
        message.success('로그인 성공!');
        if (location) {
          const locationArr = location.split(' ');
          navigate(`/district/${locationArr[1]}`);
        } else {
          navigate('/');
        }
      } else {
        message.error('로그인 실패: 올바른 정보를 확인하세요.');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('로그인에 실패했습니다. 이메일과 비밀번호를 확인하세요.');
    }
  };

  const handleBankerLogin = (values: loginForm) => {
    const { email, password } = values;
    const storedBanker = findBanker(email);
    if (!storedBanker || email !== storedBanker.email) {
      message.warning('존재하지 않는 행원입니다.');
      return;
    }

    if (password === storedBanker.password) {
      const token: string = 'generatedAuthToken';
      const role: string = userType;
      const branchName: string = storedBanker.branchName;
      console.log('Dispatching loginSuccess with:', {
        token,
        email,
        role,
        branchName,
      });
      dispatch(loginSuccess(token, email, role, branchName));
      message.success('로그인 성공!');
      navigate('/');
    } else {
      message.warning('비밀번호가 잘못되었습니다.');
    }
  };

  const handleLogin = (values: loginForm) => {
    if (userType == 'C') {
      handleUserLogin(values);
    } else if (userType == 'B') {
      handleBankerLogin(values);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center gap-10">
      <div className="w-96 p-8 flex flex-col gap-6  bg-white shadow-lg rounded-lg">
        <h2 className="text-lg text-bold text-center">WOULD YOU HANA</h2>
        <Radio.Group
          onChange={(e) => setUserType(e.target.value)}
          value={userType}
        >
          <Radio value={'C'}>일반 회원</Radio>
          <Radio value={'B'}>행원</Radio>
        </Radio.Group>
        <Form
          onFinish={handleLogin}
          name="login"
          initialValues={{ email: '', password: '' }}
          size="large"
        >
          <Form.Item name="email">
            <Input
              prefix={<UserOutlined />}
              type="email"
              placeholder="이메일"
            />
          </Form.Item>

          <Form.Item name="password">
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="비밀번호"
            />
          </Form.Item>

          <Form.Item label={null}>
            <Button block type="primary" htmlType="submit">
              로그인
            </Button>
          </Form.Item>
        </Form>
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
