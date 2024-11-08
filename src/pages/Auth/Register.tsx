import React, { useState } from 'react';
import InputField from '../../components/InputField';
import UserTypeRadio from '../../components/UserTypeRadio';
import { saveUser, findUser, hasNickname } from '../../utils/userStorage';
import { message, Button, Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Categories } from '../../constants/posts';

interface User {
  email: string;
  password: string;
  nickname: string;
  name: string;
  gender: 'F' | 'M';
  phone: string;
  birthDate: string;
  location: string[];
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
  </div>
);

const NicknameInput: React.FC<{
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  isNicknameChecked: boolean;
  setIsNicknameChecked: React.Dispatch<React.SetStateAction<boolean>>;
  nicknameDuplicate: boolean;
  setNicknameDuplicate: React.Dispatch<React.SetStateAction<boolean>>;
  nicknameError : boolean;
  setNicknameError : React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  nickname,
  setNickname,
  isNicknameChecked,
  setIsNicknameChecked,
  nicknameDuplicate,
  setNicknameDuplicate,
  nicknameError,
  setNicknameError
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
        setNicknameDuplicate(hasNickname(nickname));
        setIsNicknameChecked(true);
        const nicknamePattern = /^[a-zA-Z가-힣]{2,10}$/;
        setNicknameError(!nicknamePattern.test(nickname));       
      }}
    />
    {nicknameError && <p className="text-red-500">닉네임은 한글 또는 영문으로 2자 이상 10자 이하여야 합니다.</p>}
    {isNicknameChecked && nicknameDuplicate && !nicknameError ? (
      <p className="text-red-500">이미 사용중인 닉네임입니다.</p>
    ) : isNicknameChecked && nickname && !nicknameError ? (
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
  const [nicknameError, setNicknameError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string>('');
  const [birthError, setBirthError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [phoneValue, setPhoneValue] = useState("");
  const [birthDateValue, setBirthDateValue] = useState("");

  const validatePhone = (value: string) => {
    const phonePattern = /^(01[0-9]{1,3})-([0-9]{3,4})-([0-9]{4})$/;
    return phonePattern.test(value)
      ? ''
      : '전화번호는 10자리 또는 11자리 숫자여야 합니다.';
  };

  const validateBirthDate = (value: string) => {
    if(value.length < 10) {
      return '생년월일은 YYYYMMDD 형식이어야 합니다.';
    }
    else {
      const [year, month, day] = value.split('.');
      const date = new Date(year, month - 1, day);  // month는 0부터 시작하므로 1을 빼야 함
      if (!(date.getFullYear() === parseInt(year) &&
        date.getMonth() === parseInt(month) - 1 && date.getDate() === parseInt(day))) {
          return '유효한 날짜가 아닙니다.';
      }
    }
  };

  const formatPhoneNumber = (value) => {
    // 숫자만 남기고 모두 제거
    const cleaned = value.replace(/\D/g, "");

    // 010-xxxx-xxxx 형식으로 변환
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 7) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
    }
  };
  const phoneNumberHandleChange = (event) => {
    setPhoneValue(event.target.value);
  };

  const formatBirthDate = (value) => {
    // 숫자만 남기고 모두 제거
    const cleaned = value.replace(/\D/g, "");

    // yyyy-mm-dd 형식으로 변환
    if (cleaned.length <= 4) {
      return cleaned; // 4자리 연도까지
    } else if (cleaned.length <= 6) {
      return `${cleaned.slice(0, 4)}.${cleaned.slice(4)}`; // yyyy-mm
    } else {
      return `${cleaned.slice(0, 4)}.${cleaned.slice(4, 6)}.${cleaned.slice(6, 8)}`; // yyyy-mm-dd
    }
  };
  const birthDateHandleChange = (event) => {
    const formattedDate = formatBirthDate(event.target.value);
    setBirthDateValue(formattedDate);  // 입력값을 상태에 반영
  };

  const validatePassword = (value: string) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#^&*]).{8,}$/;
    return passwordPattern.test(value)
     ? ''
     : <>
     <div className="text-red-500">
      <p>비밀번호는 최소 8자 이상이고, 영소문자, 숫자,</p>
      <p>특수문자(!, @, #, ^, &, *)를 적어도 하나 포함하여야 합니다.</p>
     </div>
     </>

  }
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

    if(!isNicknameChecked) {
      message.warning('닉네임 중복 체크가 필요합니다.');
      return;
    }

    if (!user.password || user.password !== passwordConfirm) {
      message.warning('비밀번호를 확인하세요.');
      return;
    }

    const phoneValidationError = validatePhone(user.phone);
    const birthValidationError = validateBirthDate(user.birthDate);
    const passwordValidationError = validatePassword(user.password);

    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      message.warning('전화번호를 수정해주세요.');
      return;
    }

    if (birthValidationError) {
      setBirthError(birthValidationError);
      message.warning('생년월일을 수정해주세요.');
      return;
    }

    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      message.warning('비밀번호를 수정해주세요.');
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

  const handleLocationChange = (field: 'loc1' | 'loc2', value: string) => {
    if (field === 'loc2') {
      setUser({ ...user, location: [value]  }); // loc2(구)만 저장
    }
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
        nicknameError={nicknameError}
        setNicknameError={setNicknameError}
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
        onChange={(e) => {
          const value = e.target.value;
          setUser({ ...user, password: e.target.value });
          setPasswordError(validatePassword(value));
          }
        }
        required
      />
      {passwordError && <p>{passwordError}</p>}
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
        <input
          className="border rounded-md p-2 w-full 
            focus:outline-none focus:ring-0 focus:shadow-none hover:ring-0 
            text-black placeholder:text-gray-400 transition duration-800"
          type="text"
          placeholder="서울특별시"
          value="서울특별시"
          readOnly
        />
        <InputField
          htmlFor="loc2"
          type="text"
          placeholder="주소(구) ex: 서초구, 광진구"
          value={user.location}
          onChange={(e) => handleLocationChange('loc2', e.target.value)
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
        value={formatPhoneNumber(phoneValue)}
        onChange={(e) => {
          const value = e.target.value;
          setUser({ ...user, phone: value });
          setPhoneError(validatePhone(value));
          phoneNumberHandleChange(e);
        }}
        required
      />
      {phoneError && <p className="text-red-500">{phoneError}</p>}
      <InputField
        htmlFor="birthDate"
        type="text"
        placeholder="생년월일 (YYYYMMDD)"
        value={formatBirthDate(birthDateValue)}
        onChange={(e) => {
          const value = e.target.value;
          setUser({ ...user, birthDate: value });
          setBirthError(validateBirthDate(value));
          birthDateHandleChange(e);
        }}
        required
      />
      {birthError && <p className="text-red-500">{birthError}</p>}
      <button
        type="submit"
        className="block p-2 bg-mainColor text-white rounded-md transition-colors duration-200 hover:bg-hoverColor"
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
          options={Categories.map((category) => ({
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