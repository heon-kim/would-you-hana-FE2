import React, { useState } from 'react';
import InputField from '../../components/InputField';
import { saveBanker, findBanker } from '../../utils/userStorage';
import { message, Button, Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Categories } from '../../constants/posts';

interface Banker {
  email: string;
  password: string;
  name: string;
  gender: 'F' | 'M';
  phone: string;
  branchName: string;
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

const InputForm: React.FC<{
  banker: Banker;
  setBanker: React.Dispatch<React.SetStateAction<Banker>>;
  setCompleteInputForm: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ banker, setBanker, setCompleteInputForm }) => {
  const [emailPrefix, setEmailPrefix] = useState<string>('');
  const [emailHost, setEmailHost] = useState<string>('gmail.com');
  const [customEmailHost, setCustomEmailHost] = useState<string>('');
  const [authNum, setAuthNum] = useState<string>(''); // Change type to string for input
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [isCustomEmail, setIsCustomEmail] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [phoneValue, setPhoneValue] = useState("");

  const validatePhone = (value: string) => {
    const phonePattern = /^(01[0-9]{1,3})-([0-9]{3,4})-([0-9]{4})$/;
    return phonePattern.test(value)
      ? ''
      : '전화번호는 10자리 또는 11자리 숫자여야 합니다.';
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
   

    if (findBanker(email)) {
      message.warning('이미 존재하는 이메일입니다.');
      return;
    }

    if (!banker.password || banker.password !== passwordConfirm) {
      message.warning('비밀번호를 확인하세요.');
      return;
    }

    const phoneValidationError = validatePhone(banker.phone);
    const passwordValidationError = validatePassword(banker.password);

    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      message.warning('전화번호를 수정해주세요.');
      return;
    }

    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      message.warning('비밀번호를 수정해주세요.');
      return;
    }

    setBanker({
      ...banker,
      email,
      password: banker.password,
    });

    setCompleteInputForm(true);
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-3">
      
      <InputField
        htmlFor="name"
        type="text"
        placeholder="이름"
        value={banker.name}
        onChange={(e) => setBanker({ ...banker, name: e.target.value })}
        required
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
        value={banker.password}
        onChange={(e) => {
          const value = e.target.value;
          setBanker({ ...banker, password: e.target.value });
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
      {passwordConfirm && banker.password !== passwordConfirm && (
        <p className="text-red-500">비밀번호가 일치하지 않습니다.</p>
      )}
            
      <div className="flex gap-4">
        <div
          className={`w-full text-center border rounded-md p-2 cursor-pointer ${
            banker.gender === 'M' ? 'bg-gray-400 text-white' : 'bg-white'
          }`}
          onClick={() => setBanker({ ...banker, gender: 'M' })}
        >
          남자
        </div>
        <div
          className={`w-full text-center border rounded-md p-2 cursor-pointer ${
            banker.gender === 'F' ? 'bg-gray-400 text-white' : 'bg-white'
          }`}
          onClick={() => setBanker({ ...banker, gender: 'F' })}
        >
          여자
        </div>
      </div>
      <InputField
        htmlFor="location"
        type="text"
        placeholder="지점명"
        value={banker.branchName}
        onChange={(e) => {
          const value = e.target.value;
          setBanker({ ...banker, branchName: value });
        }}
        required
      />
      <InputField
        htmlFor="phone"
        type="text"
        placeholder="전화번호 (숫자만 입력)"
        value={formatPhoneNumber(phoneValue)}
        onChange={(e) => {
          const value = e.target.value;
          setBanker({ ...banker, phone: value });
          setPhoneError(validatePhone(value));
          phoneNumberHandleChange(e);
        }}
        required
      />
      {phoneError && <p className="text-red-500">{phoneError}</p>}
      
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
  banker: Banker;
  setBanker: React.Dispatch<React.SetStateAction<Banker>>;
}> = ({ banker, setBanker}) => {
  const MAX_COUNT = 3;
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleChange = (value: string[]) => {
    if (value.length <= MAX_COUNT) {
      setSelectedItems(value);
      setBanker((prevBanker) => ({
        ...prevBanker,
        interests: JSON.stringify(value),
      }));
    } else {
      message.warning(`최대 ${MAX_COUNT}개까지 선택할 수 있습니다.`);
    }
  };

  const handleSaveBanker = () => {
    saveBanker(banker);
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
          onClick={handleSaveBanker}
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

const BankerRegister: React.FC = () => {
  const [completeInputForm, setCompleteInputForm] = useState<boolean>(false);
  const [banker, setBanker] = useState<Banker>({
    email: '',
    password: '',
    name: '',
    gender: 'M',
    phone: '',
    branchName: '',
    interests: '',
  });

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-auto shadow-md p-8 flex flex-col gap-6 rounded-md">
        <h2 className="text-lg font-bold text-center">WOULD YOU HANA</h2>
        {completeInputForm ? (
          <SelectInterest banker={banker} setBanker={setBanker} />
        ) : (
          <InputForm
            banker={banker} 
            setBanker={setBanker}
            setCompleteInputForm={setCompleteInputForm}
          />
        )}
      </div>
    </div>
  );
};

export default BankerRegister;
