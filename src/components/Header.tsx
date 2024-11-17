import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/img/logo.png';
import userIcon from '../assets/img/icon_user.png';
import locationIcon from '../assets/img/icon_location.svg';
import { useSelector, useDispatch } from 'react-redux';
import store, { RootState } from '../hoc/store';
import { logout } from '../hoc/actions';
import { message, Select } from 'antd';
import type { SelectProps } from 'antd';
import { getUserLocation } from '../hoc/request';
import { findUser, findBanker} from '../utils/userStorage';

// SearchInput 컴포넌트
const SearchInput: React.FC<{
  placeholder: string;
  style: React.CSSProperties;
  value: string;
  onChange: (newValue: string) => void;
}> = (props) => {
  const [data, setData] = useState<SelectProps['options']>([]);
  const [favoriteLocations, setFavoriteLocations] = useState<string[]>([]);

  useEffect(() => {
    const loggedUser = localStorage.getItem('userEmail');
    if (loggedUser) {
      const user = findUser(loggedUser);
      setFavoriteLocations(user?.favoriteLocations || ['광진구']);
    } else {
      setFavoriteLocations(['광진구']);
    }
  }, []);

  const navigate = useNavigate();

  const handleSearch = async (value: string) => {
    const filteredData = favoriteLocations
      .map((loc) => {
        return { text: loc, value: loc };
      })
      .filter((item) => item.text.toLowerCase().includes(value.toLowerCase()));
    await setData(filteredData);
  };
      

  const navigateToLanding = (district : string) => {
    console.log(district);
    if(district === '광진구') {
      navigate('/gwangjin');
    }
    else if(district === '서초구') {
      navigate('/seocho');
    }
  }

  // 지역이 선택되었을 때, 그 값을 상태로 저장
  const handleChange = (selectedDistrict: string) => {
    props.onChange(selectedDistrict); // 부모 컴포넌트에 선택된 값을 전달
    navigateToLanding(selectedDistrict); // 선택된 지역으로 페이지 이동
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
        onChange={handleChange}
        notFoundContent={null}
        options={data?.map((d) => ({
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

interface LoggedInComponentProps {
  onLogout: () => void;
  loggedInUserType : string | null;
}

function LoggedInComponent({ onLogout, loggedInUserType }: LoggedInComponentProps) {
    const loggedUser = localStorage.getItem('userEmail');
    let user, banker;
    if (loggedUser) {
      user = loggedInUserType == 'C' ? findUser(loggedUser) : undefined;
      banker = loggedInUserType == 'B' ? findBanker(loggedUser) : undefined;
    }
    return (
      <div>
        <ul className='flex gap-8 items-center '>
          <li>
            <span onClick={onLogout} style={{ cursor: 'pointer' }}>
              로그아웃
            </span>
          </li>
          <li>
            <Link to="/my/profile" className="flex items-center gap-2">
              <img src={userIcon} alt="user icon" width={35} />
              {user && (<span>{user.nickname}</span>)}
              {banker && (<span>{banker.name}</span>)}
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
  const [loggedInType, setLoggedInType] = useState<string|null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch<typeof store.dispatch>();
  const userLocation = getUserLocation(); //사용자의 초기 위치값

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const loggedInUserType = useSelector(
    (state:RootState) => state.auth.userRole
  );

  useEffect(() => {
      setIsLoggedIn(isAuthenticated);
      setLoggedInType(loggedInUserType);
  }, [isAuthenticated, loggedInUserType]);

  const handleLogout = () => {
    dispatch(logout());
    message.success('로그아웃 성공!');
    navigate('/');
  };

  const handleSearchValueChange = (newValue: string) => {
    setSearchValue(newValue); // searchValue 업데이트
    localStorage.setItem('userLocation', newValue); 
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
            <li>
              <Link to='/community'>커뮤니티</Link>
            </li>
          </ul>
        </nav>

        {loggedInType !== 'B' && (
          <div className='flex ml-auto mr-10 gap-3 items-center'>
          {/* 검색한 위치가 없는 경우, userLocation값이 입력됨 */}
          <SearchInput placeholder='지역을 입력하세요' style={{ width: 200 }} value={searchValue || userLocation || ''} onChange={handleSearchValueChange} />
        </div>
        )}

        {isLoggedIn ? (
          <LoggedInComponent onLogout={handleLogout} loggedInUserType={loggedInType} />
        ) : (
          <LoggedOutComponent />
        )}
      </div>
    </div>
  );
}

export default Header;
