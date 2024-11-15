import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findBanker, findUser } from '../../utils/userStorage';
import { message, Radio, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../hoc/actions';

interface loginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [userType, setUserType] = useState<'C' | 'B'>('C'); // 일반회원(customer: C) | 행원(banker: B)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser');
    const loggedBanker = localStorage.getItem('loggedBanker');
    if (loggedUser || loggedBanker) {
      navigate('/');
    }
  }, [navigate]);

  const handleUserLogin = (values: loginForm) => {
    const { email, password } = values;
    const storedUser = findUser(email);
    if (!storedUser || email !== storedUser.email) {
      message.warning('존재하지 않는 회원입니다.');
      return;
    }

    if (password === storedUser.password) {
      const token: string = 'generatedAuthToken';
      const role: string = userType;
      const location: string[] = Array.isArray(storedUser.location)
        ? storedUser.location
        : [storedUser.location];
      console.log('Dispatching loginSuccess with:', {
        token,
        email,
        role,
        location,
      });
      dispatch(loginSuccess(token, email, role, location));

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
