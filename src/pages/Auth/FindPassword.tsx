import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, message } from 'antd';

// 비밀번호 유효성 검사 함수
const validatePassword = (password: string) => {
  const passwordPattern = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#^&*]).{8,}$/;
  return passwordPattern.test(password)
    ? null
    : '비밀번호는 최소 8자 이상이고, 영소문자, 숫자, 특수문자(!, @, #, ^, &, *)를 적어도 하나 포함해야 합니다.';
};

const FindPassword: React.FC = () => {
  const [email, setEmail] = useState<string>(''); // 이메일 입력 상태
  const [isAuthNumSent, setIsAuthNumSent] = useState(false); // 인증번호 전송
  const [authNum, setAuthNum] = useState<string>(''); // 인증번호 입력 상태
  const [password, setPassword] = useState<string>(''); // 비밀번호 입력 상태
  const [passwordConfirm, setPasswordConfirm] = useState<string>(''); // 비밀번호 확인 상태
  const [isAuthNumValid, setIsAuthNumValid] = useState<boolean>(false); // 인증번호 유효성 확인
  const [passwordError, setPasswordError] = useState<string | null>(null); // 비밀번호 에러 메시지
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false); // 비밀번호 유효성 확인
  const navigate = useNavigate();

  // 인증번호가 6자리일 때 비밀번호 입력 필드 보이기
  const handleAuthNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAuthNum(value);

    if (value.length === 6) {
      setIsAuthNumValid(true); // 인증번호가 6자리 입력되면 비밀번호 필드 표시
    } else {
      setIsAuthNumValid(false);
    }
  };

  // 비밀번호 입력 시 유효성 검사
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const validationError = validatePassword(value); // 비밀번호 유효성 검사 함수
    setPasswordError(validationError); // 에러 메시지 설정
    setIsPasswordValid(validationError === null); // 비밀번호가 유효하면 true
  };

  // 비밀번호 확인 입력 시 확인
  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(e.target.value);
  };

  // 비밀번호와 비밀번호 확인이 일치하는지 검사
  const isPasswordMatch = password === passwordConfirm;

  return (
    <div className='h-full flex flex-col justify-center items-center gap-10'>
      <div className='w-96 p-8 flex flex-col gap-6  bg-white shadow-lg rounded-lg'>
        <h2 className='text-center text-xl font-bold mb-4'>비밀번호 찾기</h2>

        {/* 이메일 입력 칸 */}
        <div className='mb-4 flex gap-3'>
          <Input
            type='email'
            placeholder='이메일 입력'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={() => setIsAuthNumSent(true)}>인증번호 전송</Button>
        </div>

        {/* 인증번호 입력 칸 */}
        {isAuthNumSent && (
          <div className='mb-4'>
            <Input
              type='text'
              placeholder='인증번호 (6자리)'
              value={authNum}
              onChange={handleAuthNumChange}
              maxLength={6} // 인증번호는 6자리만 입력
            />
          </div>
        )}

        {/* 인증번호가 유효하면 비밀번호 입력 필드 보이기 */}
        {isAuthNumValid && (
          <>
            <div className='mb-4'>
              <Input.Password
                placeholder='새 비밀번호'
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordError && <p className='text-red-500'>{passwordError}</p>}
            </div>

            <div className='mb-4'>
              <Input.Password
                placeholder='비밀번호 확인'
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
              />
              {passwordConfirm && !isPasswordMatch && (
                <p className='text-red-500'>비밀번호가 일치하지 않습니다.</p>
              )}
            </div>
          </>
        )}

        {/* 비밀번호가 유효하고, 두 비밀번호가 일치할 경우에만 버튼 활성화 */}
        <Button
          type='primary'
          className='w-full'
          disabled={!isPasswordValid || !isPasswordMatch}
          onClick={() => {
            message.success('비밀번호가 변경되었습니다!');
            navigate('/login');
          }}
        >
          비밀번호 변경
        </Button>
      </div>
    </div>
  );
};

export default FindPassword;
