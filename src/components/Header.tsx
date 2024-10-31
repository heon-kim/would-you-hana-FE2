import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/img/logo.png';
import userIcon from '../assets/img/icon_user.png';
import locationIcon from '../assets/img/icon_location.svg';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../hoc/store';
import { logout } from '../hoc/actions';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, message, Select } from 'antd';
import type { MenuProps, SelectProps } from 'antd';
import { setAuthHeader, setUserRole, setUserEmail, getUserLocation } from '../hoc/request';

// SearchInput 컴포넌트에 사용할 로컬 데이터
const items = [
  { value: '서울시 성동구', text: '서울시 성동구' },
  { value: '서울시 동작구', text: '서울시 동작구' },
  { value: '서울시 강남구', text: '서울시 강남구' },
  { value: '서울시 서초구', text: '서울시 서초구' },
  { value: '서울시 관악구', text: '서울시 관악구' },
  // 필요한 다른 데이터 추가
];

// 검색 기능을 수행하는 함수
const fetch = (
  value: string,
  callback: (data: { value: string; text: string }[]) => void
) => {
  const filteredData = items.filter((item) =>
    item.text.toLowerCase().includes(value.toLowerCase())
  );
  callback(filteredData);
};

// SearchInput 컴포넌트
const SearchInput: React.FC<{
  placeholder: string;
  style: React.CSSProperties;
  value: string; // value prop 추가
  onChange: (newValue: string) => void; // onChange prop 추가
}> = (props) => {
  const [data, setData] = useState<SelectProps['options']>([]);

  const handleSearch = (newValue: string) => {
    fetch(newValue, setData);
  };

  return (
    <div className='flex gap-3 items-center'>
      <Select
        showSearch
        value={props.value}
        placeholder={props.placeholder}
        style={props.style}
        defaultActiveFirstOption={false}
        filterOption={false}
        onSearch={handleSearch}
        onChange={props.onChange}
        notFoundContent={null}
        options={(data || []).map((d) => ({
          value: d.value,
          label: d.text,
        }))}
      />
      {/* 현위치 받아오기 */}
      <button onClick={()=>props.onChange('현위치')}> 
        <img src={locationIcon} width={'20px'} />
      </button>
    </div>
  );
};

// LoggedInComponent 및 LoggedOutComponent는 그대로 둡니다.
interface LoggedInComponentProps {
  onLogout: () => void;
}

function LoggedInComponent({ onLogout }: LoggedInComponentProps) {
  return (
    <div>
      <ul className='flex gap-8 items-center '>
        <li>
          <span onClick={onLogout} style={{ cursor: 'pointer' }}>
            로그아웃
          </span>
        </li>
        <li>
          <Link to='/my/profile' className='flex items-center gap-2'>
            <img src={userIcon} alt='user icon' width={35} />
          </Link>
        </li>
      </ul>
    </div>
  );
}

function LoggedOutComponent() {
  return (
    <nav className='flex items-center'>
      <ul className='flex gap-8 items-center '>
        <li>
          <Link to='/register'>회원가입</Link>
        </li>
        <li>
          <Link to='/login'>로그인</Link>
        </li>
      </ul>
    </nav>
  );
}

// Header 컴포넌트
function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLocation = getUserLocation();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    setIsLoggedIn(isAuthenticated);
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    setUserRole(null);
    setUserEmail(null);
    setAuthHeader(null);
    setIsLoggedIn(false);
    dispatch(logout());
    message.success('로그아웃 성공!');
    navigate('/');
  };

  const handleSearchValueChange = (newValue: string) => {
    setSearchValue(newValue); // searchValue 업데이트
  };

  return (
    <div className='w-screen px-6 py-3 flex items-center bg-white border-b'>
      <Link to='/'>
        <img src={logo} alt='logo' width={130} />
      </Link>

      <div className='w-full flex justify-between'>
        <nav className='flex items-center'>
          <ul className='flex gap-8 items-center'>
            <li>
              <Link to='/qna'>Q&A</Link>
            </li>
            <li>
              <Link to='/hana'>우주하나</Link>
            </li>
            <li>
              <Link to='/findbank'>영업점 찾기</Link>
            </li>
          </ul>
        </nav>

        <div className='flex ml-auto mr-10 gap-3 items-center'>
          {/* 검색한 위치가 없는 경우 userLocation값이 입력됨 */}
          <SearchInput placeholder='지역을 입력하세요' style={{ width: 200 }} value={searchValue || userLocation} onChange={handleSearchValueChange} />
        </div>

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
