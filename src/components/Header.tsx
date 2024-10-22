import { Link } from "react-router-dom"; // Import necessary routing components
import { useState, useEffect } from "react";
import logo from "../assets/img/logo.png";
import userIcon from "../assets/img/icon_user.png";

import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

const items: MenuProps["items"] = [
  {
    label: "서울시 성동구",
    key: "0",
  },
  {
    label: "서울시 동작구",
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: <a href="/location">내 동네 설정</a>,
    key: "3",
  },
];

interface LoggedInComponentProps {
  onLogout: () => void;
}

function LoggedInComponent({ onLogout }: LoggedInComponentProps) {
  const [label, setLabel] = useState<string>("내 동네 설정");

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const selectedItem = items?.find((item) => item?.key === e.key);
    if (selectedItem && "label" in selectedItem) {
      setLabel(selectedItem.label as string);
    }
  };

  const menu: MenuProps = {
    items: items?.map((item) => ({
      ...item,
      onClick: item && "label" in item ? handleMenuClick : undefined,
    })),
  };
  return (
    <div>
      <ul className="flex gap-8 items-center ">
        <li>
          <Dropdown menu={menu}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {label}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </li>
        <li>
          <Link to="/my">마이페이지</Link>
        </li>
        <li>
          <span onClick={onLogout} style={{ cursor: "pointer" }}>
            로그아웃
          </span>
        </li>
        <li className="flex items-center gap-2">
          <img src={userIcon} alt="user icon" width={35} />
          <span>김하나</span>
        </li>
      </ul>
    </div>
  );
}

function LoggedOutComponent() {
  return (
    <nav className="flex items-center ">
      <ul className="flex gap-8 items-center ">
        <li>
          <Link to="/register">회원가입</Link>
        </li>
        <li>
          <Link to="/login">로그인</Link>
        </li>
      </ul>
    </nav>
  );
}
function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("loggedUser");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    setIsLoggedIn(false);
    alert("로그아웃 성공!");
    window.location.href = "/";
  };

  return (
    <div className="w-screen px-6 py-3 flex items-center bg-white border-b">
      <Link to="/">
        <img src={logo} alt="logo" width={130} />
      </Link>

      <div className="w-full flex justify-between font-extrabold">
        <nav className="flex items-center ">
          <ul className="flex gap-8 items-center ">
            <li>
              <Link to="/qna">Q&A</Link>
            </li>
            <li>
              <Link to="/hana">우주하나</Link>
            </li>
          </ul>
        </nav>
        {isLoggedIn ? (
          <LoggedInComponent onLogout={handleLogout} />
        ) : (
          <LoggedOutComponent />
        )}
      </div>
    </div>
  );
}

export default Header;
