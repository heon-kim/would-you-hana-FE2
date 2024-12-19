import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Radio, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../hoc/actions';
import store from '../../hoc/store';
import { AxiosResponse } from 'axios';
import { request } from '../../hoc/request'
import { config } from '../../config/config';

interface loginForm {
  email: string;
  password: string;
}

// 일반회원, 행원 응답 DTO가 같음
interface CustomerSignInReturnDto {
  token: string;
  id: number;
  email: string;
  role: string;
  location: string;
  nickName: string;
  interestLocations: string[];
}

const Login: React.FC = () => {
  const [userType, setUserType] = useState<'C' | 'B'>('C'); // 일반회원(customer: C) | 행원(banker: B)
  const navigate = useNavigate();
  const dispatch = useDispatch<typeof store.dispatch>();
  const BASE_URL = config.apiUrl;


  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser');
    const loggedBanker = localStorage.getItem('loggedBanker');
    if (loggedUser || loggedBanker) {
      navigate('/');
    }
  }, [navigate]);

  const handleUserLogin = async (userType: 'C' | 'B', values: loginForm) => {
    const { email, password } = values;
    const url = userType == 'C' ? `${BASE_URL}/members/signIn` : `${BASE_URL}/bankers/signIn`;

    try {
      // 백엔드로 로그인 요청 보내기
      const response: AxiosResponse<CustomerSignInReturnDto> = await request({
        method: 'POST',
        url: url,
        data: { email, password }
      });
      
      const { token, email: returnedEmail, id, role, location, nickName:nickname, interestLocations:interestLocations } = response.data;

      if (token && location) {
        // Redux 상태 업데이트
        console.log('Dispatching loginSuccess with:', {
          token: token,
          email: returnedEmail,
          id: id,
          role: role,
          location: location,
          nickname: nickname,
          interestLocations: interestLocations
        });
        localStorage.setItem('interestLocations', JSON.stringify(interestLocations));
        dispatch(loginSuccess(token, Number(id), returnedEmail, role, location, nickname));

        // 메시지 및 네비게이션 처리
        message.success('로그인 성공!');
        if (userType == 'C' && location) {
          navigate(`/district/${location}`);
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

  const handleLogin = (values: loginForm) => {
    handleUserLogin(userType, values);
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
