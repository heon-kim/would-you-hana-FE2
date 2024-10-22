import React, { useState } from "react";
import InputField from "../components/InputField";
import { saveUser, findUser, findNickname } from "../utils/userStorage";

const Register: React.FC = () => {
  const [nickname, setNickname] = useState<string>("");
  const [emailPrefix, setEmailPrefix] = useState<string>("");
  const [emailHost, setEmailHost] = useState<string>("gmail.com");
  const [customEmailHost, setCustomEmailHost] = useState<string>("");
  const [authNum, setAuthNum] = useState<number | null>(null);
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<"F" | "M">("M"); // 여자(F) | 남자(M)
  const [phoneNum, setPhoneNum] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [address1, setAddress1] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");
  const [userType, setUserType] = useState<"C" | "B">("C"); // 일반회원(customer: C) | 행원(banker: B)
  const [isCustomEmail, setIsCustomEmail] = useState<boolean>(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);
  const [nicknameDuplicate, setNicknameDuplicate] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string>("");
  const [birthError, setBirthError] = useState<string>("");

  const handleEmailPrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value.includes("@")) {
      setEmailPrefix(value);
    }
  };

  const validatePhoneNum = (value: string) => {
    const phonePattern = /^[0-9]{10,11}$/;
    return phonePattern.test(value)
      ? ""
      : "전화번호는 10자리 또는 11자리 숫자여야 합니다.";
  };

  const validateBirthDate = (value: string) => {
    const birthPattern = /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;
    return birthPattern.test(value)
      ? ""
      : "생년월일은 YYYYMMDD 형식이어야 합니다.";
  };

  const handlePhoneNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNum(value);
    const error = validatePhoneNum(value);
    setPhoneError(error);
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBirthDate(value);
    const error = validateBirthDate(value);
    setBirthError(error);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const finalEmailHost = isCustomEmail ? customEmailHost : emailHost;

    setPhoneError("");
    setBirthError("");

    if (nicknameDuplicate) {
      alert("닉네임을 변경하세요.");
      return;
    }

    if (findUser(`${emailPrefix}@${finalEmailHost}`)) {
      alert("이미 존재하는 이메일입니다.");
      return;
    }

    if (!password || password !== passwordConfirm) {
      alert("비밀번호를 확인하세요.");
      return;
    }

    const phoneValidationError = validatePhoneNum(phoneNum);
    const birthValidationError = validateBirthDate(birthDate);

    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }

    if (birthValidationError) {
      setBirthError(birthValidationError);
      return;
    }

    saveUser({
      email: `${emailPrefix}@${finalEmailHost}`,
      password,
      nickname,
      name,
      gender,
      phoneNum,
      birthDate,
      address1,
      address2,
      userType,
    });
    alert("회원가입 성공! 로그인 페이지로 이동합니다.");
    window.location.href = "/login";
  };

  const handleAuthNum = () => {};

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-auto shadow-md p-8 flex flex-col gap-6 rounded-md">
        <h2 className="text-lg font-bold text-center">WOULD YOU HANA</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                value="C"
                checked={userType === "C"}
                onChange={() => setUserType("C")}
              />
              일반 회원 가입
            </label>
            <label>
              <input
                type="radio"
                value="B"
                checked={userType === "B"}
                onChange={() => setUserType("B")}
              />
              행원 가입
            </label>
          </div>
          <InputField
            htmlFor="nickname"
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required={true}
            showButton={true}
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
          <div className="flex gap-2">
            <InputField
              htmlFor="emailPrefix"
              type="text"
              placeholder="이메일"
              value={emailPrefix}
              onChange={handleEmailPrefixChange}
              required={true}
            />
            <span className="self-center">@</span>
            <select
              value={isCustomEmail ? "직접 입력" : emailHost}
              onChange={(e) => {
                if (e.target.value === "직접 입력") {
                  setIsCustomEmail(true);
                  setCustomEmailHost("");
                } else {
                  setIsCustomEmail(false);
                  setEmailHost(e.target.value);
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
          {isCustomEmail && (
            <InputField
              htmlFor="customEmailHost"
              type="text"
              placeholder="이메일 호스트 입력"
              value={customEmailHost}
              onChange={(e) => setCustomEmailHost(e.target.value)}
              required={true}
            />
          )}
          <InputField
            htmlFor="authNum"
            type="number"
            placeholder="인증번호"
            value={authNum}
            onChange={(e) => setAuthNum(parseInt(e.target.value))}
            required={true}
            showButton={true}
            buttonLabel="인증번호 발송"
            onClickButton={handleAuthNum}
          />
          <InputField
            htmlFor="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />
          <InputField
            htmlFor="passwordConfirm"
            type="password"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required={true}
          />
          {passwordConfirm && password !== passwordConfirm && (
            <p className="text-red-500">비밀번호가 일치하지 않습니다.</p>
          )}
          <div className="flex gap-2">
            <InputField
              htmlFor="address1"
              type="text"
              placeholder="주소 (시/도)"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              required={true}
            />
            <InputField
              htmlFor="address2"
              type="text"
              placeholder="주소 (시/군/구)"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              required={true}
            />
          </div>
          <InputField
            htmlFor="name"
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
          <div className="flex gap-4">
            <div
              className={`w-full text-center border rounded-md p-2 cursor-pointer ${
                gender === "M" ? "bg-gray-400 text-white" : "bg-white"
              }`}
              onClick={() => setGender("M")}
            >
              남자
            </div>
            <div
              className={`w-full text-center border rounded-md p-2 cursor-pointer ${
                gender === "F" ? "bg-gray-400 text-white" : "bg-white"
              }`}
              onClick={() => setGender("F")}
            >
              여자
            </div>
          </div>
          <InputField
            htmlFor="phoneNum"
            type="text"
            placeholder="전화번호 (숫자만 입력)"
            value={phoneNum}
            onChange={handlePhoneNumChange}
            required={true}
          />
          {phoneError && <p className="text-red-500">{phoneError}</p>}
          <InputField
            htmlFor="birthDate"
            type="text"
            placeholder="생년월일 (YYYYMMDD)"
            value={birthDate}
            onChange={handleBirthDateChange}
            required={true}
          />
          {birthError && <p className="text-red-500">{birthError}</p>}
          <button
            type="submit"
            className="block p-2 bg-mainColor text-white rounded-md"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
