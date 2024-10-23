import React, { useState } from 'react';
import InputField from '../../components/InputField';
import UserTypeRadio from '../../components/UserTypeRadio';
import { saveUser, findUser, findNickname } from '../../utils/userStorage';
import { message, Button, Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface User {
  email: string;
  password: string;
  nickname: string;
  name: string;
  gender: 'F' | 'M';
  phone: string;
  birthDate: string;
  location: string;
  userType: 'C' | 'B';
  interests: string;
}

const EmailInput: React.FC<{
  emailPrefix: string;
  setEmailPrefix: React.Dispatch<React.SetStateAction<string>>;
  isCustomEmail: boolean;
  setIsCustomEmail: React.Dispatch<React.SetStateAction<boolean>>;
  emailHost: string;
  setEmailHost: React.Dispatch<React.SetStateAction<string>>;
  customEmailHost: string;
  setCustomEmailHost: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  emailPrefix,
  setEmailPrefix,
  isCustomEmail,
  setIsCustomEmail,
  emailHost,
  setEmailHost,
  customEmailHost,
  setCustomEmailHost,
}) => (
  <div className="flex gap-2">
    <InputField
      htmlFor="emailPrefix"
      type="text"
      placeholder="이메일"
      value={emailPrefix}
      onChange={(e) => {
        const value = e.target.value;
        if (!value.includes('@')) setEmailPrefix(value);
      }}
      required
    />
    <span className="self-center">@</span>
    <select
      value={isCustomEmail ? '직접 입력' : emailHost}
      onChange={(e) => {
        const value = e.target.value;
        if (value === '직접 입력') {
          setIsCustomEmail(true);
          setCustomEmailHost('');
        } else {
          setIsCustomEmail(false);
          setEmailHost(value);
        }
      }}
      className="border w-full rounded-md p-2"
    >
      <option value="gmail.com">gmail.com</option>
      <option value="naver.com">naver.com</option>
      <option value="daum.net">daum.net</option>
      <option value="직접 입력">직접 입력</option>
    </select>
    {isCustomEmail && (
      <InputField
        htmlFor="customEmailHost"
        type="text"
        placeholder="이메일 호스트 입력"
        value={customEmailHost}
        onChange={(e) => setCustomEmailHost(e.target.value)}
        required
      />
    )}
  </div>
);

const NicknameInput: React.FC<{
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  isNicknameChecked: boolean;
  setIsNicknameChecked: React.Dispatch<React.SetStateAction<boolean>>;
  nicknameDuplicate: boolean;
  setNicknameDuplicate: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  nickname,
  setNickname,
  isNicknameChecked,
  setIsNicknameChecked,
  nicknameDuplicate,
  setNicknameDuplicate,
}) => (
  <>
    <InputField
      htmlFor="nickname"
      type="text"
      placeholder="닉네임"
      value={nickname}
      onChange={(e) => setNickname(e.target.value)}
      required
      showButton
      buttonLabel="중복 확인"
      onClickButton={() => {
        setNicknameDuplicate(findNickname(nickname));
        setIsNicknameChecked(true);
      }}
    />
    {isNicknameChecked && nicknameDuplicate ? (
      <p className="text-red-500">이미 사용중인 닉네임입니다.</p>
    ) : isNicknameChecked && nickname ? (
      <p className="text-blue-500">사용 가능한 닉네임입니다.</p>
    ) : null}
  </>
);

const InputForm: React.FC<{
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setCompleteInputForm: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ user, setUser, setCompleteInputForm }) => {
  const [emailPrefix, setEmailPrefix] = useState<string>('');
  const [emailHost, setEmailHost] = useState<string>('gmail.com');
  const [customEmailHost, setCustomEmailHost] = useState<string>('');
  const [authNum, setAuthNum] = useState<string>(''); // Change type to string for input
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [isCustomEmail, setIsCustomEmail] = useState<boolean>(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);
  const [nicknameDuplicate, setNicknameDuplicate] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string>('');
  const [birthError, setBirthError] = useState<string>('');

  const validatePhone = (value: string) => {
    const phonePattern = /^[0-9]{10,11}$/;
    return phonePattern.test(value)
      ? ''
      : '전화번호는 10자리 또는 11자리 숫자여야 합니다.';
  };

  const validateBirthDate = (value: string) => {
    const birthPattern = /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;
    return birthPattern.test(value)
      ? ''
      : '생년월일은 YYYYMMDD 형식이어야 합니다.';
  };

  const handleAuthNum = () => {
    // Implement your auth number logic here
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const finalEmailHost = isCustomEmail ? customEmailHost : emailHost;
    const email = `${emailPrefix}@${finalEmailHost}`;

    setPhoneError('');
    setBirthError('');

    if (nicknameDuplicate) {
      message.warning('닉네임을 변경하세요.');
      return;
    }

    if (findUser(email)) {
      message.warning('이미 존재하는 이메일입니다.');
      return;
    }

    if (!user.password || user.password !== passwordConfirm) {
      message.warning('비밀번호를 확인하세요.');
      return;
    }

    const phoneValidationError = validatePhone(user.phone);
    const birthValidationError = validateBirthDate(user.birthDate);

    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }

    if (birthValidationError) {
      setBirthError(birthValidationError);
      return;
    }

    setUser({
      ...user,
      email,
      nickname: user.nickname,
      password: user.password,
      userType: user.userType,
    });

    setCompleteInputForm(true);
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-3">
      <UserTypeRadio
        userType={user.userType}
        setUserType={(type) => setUser({ ...user, userType: type })}
        labels={{ customer: '일반 회원 가입', banker: '행원 가입' }}
      />
      <NicknameInput
        nickname={user.nickname}
        setNickname={(nickname) => setUser({ ...user, nickname })}
        isNicknameChecked={isNicknameChecked}
        setIsNicknameChecked={setIsNicknameChecked}
        nicknameDuplicate={nicknameDuplicate}
        setNicknameDuplicate={setNicknameDuplicate}
      />
      <EmailInput
        emailPrefix={emailPrefix}
        setEmailPrefix={setEmailPrefix}
        isCustomEmail={isCustomEmail}
        setIsCustomEmail={setIsCustomEmail}
        emailHost={emailHost}
        setEmailHost={setEmailHost}
        customEmailHost={customEmailHost}
        setCustomEmailHost={setCustomEmailHost}
      />
      <InputField
        htmlFor="authNum"
        type="text"
        placeholder="인증번호"
        value={authNum}
        onChange={(e) => setAuthNum(e.target.value)}
        required
        showButton
        buttonLabel="인증번호 발송"
        onClickButton={handleAuthNum}
      />
      <InputField
        htmlFor="password"
        type="password"
        placeholder="비밀번호"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        required
      />
      <InputField
        htmlFor="passwordConfirm"
        type="password"
        placeholder="비밀번호 확인"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        required
      />
      {passwordConfirm && user.password !== passwordConfirm && (
        <p className="text-red-500">비밀번호가 일치하지 않습니다.</p>
      )}
      <div className="flex gap-2">
        <InputField
          htmlFor="loc1"
          type="text"
          placeholder="주소 (시/도)"
          value={user.location.split(' ')[0] || ''}
          onChange={(e) =>
            setUser({
              ...user,
              location: `${e.target.value} ${
                user.location.split(' ')[1] || ''
              }`,
            })
          }
          required
        />
        <InputField
          htmlFor="loc2"
          type="text"
          placeholder="주소 (시/군/구)"
          value={user.location.split(' ')[1] || ''}
          onChange={(e) =>
            setUser({
              ...user,
              location: `${user.location.split(' ')[0] || ''} ${
                e.target.value
              }`,
            })
          }
          required
        />
      </div>
      <InputField
        htmlFor="name"
        type="text"
        placeholder="이름"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        required
      />
      <div className="flex gap-4">
        <div
          className={`w-full text-center border rounded-md p-2 cursor-pointer ${
            user.gender === 'M' ? 'bg-gray-400 text-white' : 'bg-white'
          }`}
          onClick={() => setUser({ ...user, gender: 'M' })}
        >
          남자
        </div>
        <div
          className={`w-full text-center border rounded-md p-2 cursor-pointer ${
            user.gender === 'F' ? 'bg-gray-400 text-white' : 'bg-white'
          }`}
          onClick={() => setUser({ ...user, gender: 'F' })}
        >
          여자
        </div>
      </div>
      <InputField
        htmlFor="phone"
        type="text"
        placeholder="전화번호 (숫자만 입력)"
        value={user.phone}
        onChange={(e) => {
          const value = e.target.value;
          setUser({ ...user, phone: value });
          setPhoneError(validatePhone(value));
        }}
        required
      />
      {phoneError && <p className="text-red-500">{phoneError}</p>}
      <InputField
        htmlFor="birthDate"
        type="text"
        placeholder="생년월일 (YYYYMMDD)"
        value={user.birthDate}
        onChange={(e) => {
          const value = e.target.value;
          setUser({ ...user, birthDate: value });
          setBirthError(validateBirthDate(value));
        }}
        required
      />
      {birthError && <p className="text-red-500">{birthError}</p>}
      <button
        type="submit"
        className="block p-2 bg-mainColor text-white rounded-md"
      >
        다음
      </button>
    </form>
  );
};

const SelectInterest: React.FC<{
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}> = ({ user, setUser }) => {
  const CATEGORIES = [
    '예금',
    '적금',
    '이체',
    '자산관리',
    '퇴직연금',
    '펀드',
    '신탁',
    'ISA',
    '전자금융',
    '대출',
    '외환',
    '보험',
    '카드',
    '기타',
  ];
  const MAX_COUNT = 3;
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleChange = (value: string[]) => {
    if (value.length <= MAX_COUNT) {
      setSelectedItems(value);
      setUser((prevUser) => ({
        ...prevUser,
        interests: JSON.stringify(value),
      }));
    } else {
      message.warning(`최대 ${MAX_COUNT}개까지 선택할 수 있습니다.`);
    }
  };

  const handleSaveUser = () => {
    saveUser(user);
    message.success('회원가입이 완료되었습니다!');
    navigate('/');
  };

  const suffix = (
    <>
      <span>
        {selectedItems.length} / {MAX_COUNT}
      </span>
      <DownOutlined />
    </>
  );

  return (
    <div className="flex flex-col gap-16 items-center m-auto">
      <h2 className="text-2xl font-bold text-center">WOULD YOU HANA</h2>
      <div className="flex flex-col items-center gap-8 w-80">
        <p>관심 분야를 선택해 주세요!</p>

        <Select
          mode="multiple"
          value={selectedItems}
          style={{ width: '100%' }}
          onChange={handleChange}
          suffixIcon={suffix}
          placeholder="선택"
          options={CATEGORIES.map((category) => ({
            label: category,
            value: category,
          }))}
          maxTagCount="responsive"
        />

        <Button
          type="primary"
          onClick={handleSaveUser}
          disabled={selectedItems.length !== MAX_COUNT}
          className="mt-4"
          block
        >
          완료
        </Button>
      </div>
    </div>
  );
};

const Register: React.FC = () => {
  const [completeInputForm, setCompleteInputForm] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    nickname: '',
    name: '',
    gender: 'M',
    phone: '',
    birthDate: '',
    location: '',
    userType: 'C',
    interests: '',
  });

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-auto shadow-md p-8 flex flex-col gap-6 rounded-md">
        <h2 className="text-lg font-bold text-center">WOULD YOU HANA</h2>
        {completeInputForm ? (
          <SelectInterest user={user} setUser={setUser} />
        ) : (
          <InputForm
            user={user}
            setUser={setUser}
            setCompleteInputForm={setCompleteInputForm}
          />
        )}
      </div>
    </div>
  );
};

export default Register;
