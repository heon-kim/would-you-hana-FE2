import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import { findUser } from "../utils/userStorage";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      window.location.href = "/";
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = findUser(email);
    if (!storedUser || email !== storedUser.email) {
      alert("존재하지 않는 회원입니다.");
      return;
    }

    if (password === storedUser.password) {
      localStorage.setItem("loggedUser", email);
      alert("로그인 성공!");
      window.location.href = "/";
    } else {
      alert("비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-96 p-8 flex flex-col gap-6  bg-white shadow-lg rounded-lg">
        <h2 className="text-lg text-bold text-center">WOULD YOU HANA</h2>
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
