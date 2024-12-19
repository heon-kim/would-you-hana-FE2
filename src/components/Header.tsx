// @ts-nocheck
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/img/logo.png';
import userIcon from '../assets/img/icon_user.png';
import locationIcon from '../assets/img/icon_location.svg';
import { useSelector, useDispatch } from 'react-redux';
import store, { RootState } from '../hoc/store';
import { logout } from '../hoc/actions';
import { message, Select, Button, Drawer } from 'antd';
import { MenuOutlined } from "@ant-design/icons";
import type { SelectProps } from 'antd';
import { findUser, findBanker } from '../utils/userStorage';
import { locations } from '../constants/locations';

// Kakao Maps API 스크립트를 로드하는 함수
const loadKakaoMapScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.getElementById('kakao-map-script')) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=26b73c9fe72dd7a39fc3df547c6175f2&libraries=services&autoload=false`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Kakao Maps API 스크립트를 로드하지 못했습니다.'));
    script.id = 'kakao-map-script';
    document.head.appendChild(script);
  });
};

// 지역 선택 검색창 컴포넌트
const SearchInput: React.FC<{
  placeholder: string;
  style: React.CSSProperties;
  value: string;
  onChange: (newValue: string) => void;
}> = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState<SelectProps['options']>([]);
  const [favoriteLocations, setFavoriteLocations] = useState<string[]>([]);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'interestLocations') {
        const locations: string[] = JSON.parse(event.newValue || '["광진구"]');
        setFavoriteLocations(locations);
        setData(locations.map((loc) => ({ text: loc, value: loc })));
      }
    };
  
    window.addEventListener('storage', handleStorageChange);
  
    // 초기 설정
    const loggedUser = localStorage.getItem('userEmail');
    if (loggedUser) {
      const locations: string[] = JSON.parse(localStorage.getItem('interestLocations') || '["광진구"]');
      setFavoriteLocations(locations);
      setData(locations.map((loc) => ({ text: loc, value: loc })));
    } else {
      setFavoriteLocations(locations);
      setData(locations.map((loc) => ({ text: loc, value: loc })));
    }
  
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const loggedUser = localStorage.getItem('userEmail');
    if (loggedUser) {
      //const user = findUser(loggedUser);
      const locations: string[] = JSON.parse(localStorage.getItem('interestLocations') || '[광진구]');
      //const locations = user?.favoriteLocations || ['광진구'];
      setFavoriteLocations(locations);
      setData(locations.map((loc) => ({ text: loc, value: loc }))); // 초기 데이터 설정
    } else {
      setFavoriteLocations(locations); // 모든 지역을 기본 값으로 설정
      setData(locations.map((loc) => ({ text: loc, value: loc }))); // 초기 데이터 설정
    }
  }, [isLoggedIn]);

  const handleSearch = async (value: string) => {
    const filteredData = favoriteLocations
      .map((loc) => ({ text: loc, value: loc }))
      .filter((item) => item.text.toLowerCase().includes(value.toLowerCase()));
    setData(filteredData);
  };

  const navigateToLanding = (district: string) => {
    if (district) {
      navigate(`/district/${district}`);
    } else {
      navigate('/');
    }
  };

  const handleChange = (selectedDistrict: string) => {
    props.onChange(selectedDistrict); // 부모 컴포넌트에 선택된 값을 전달
    navigateToLanding(selectedDistrict); // 선택된 지역으로 페이지 이동
  };

  const handleGetCurrentLocation = async () => {
    try {
      await loadKakaoMapScript(); // Kakao Maps API 스크립트 로드

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            // Kakao Maps API를 사용하여 좌표를 주소로 변환
            window.kakao.maps.load(() => {
              const geocoder = new window.kakao.maps.services.Geocoder();
              const coord = new window.kakao.maps.LatLng(latitude, longitude);

              geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  const address = result[0]?.address?.address_name || '주소를 찾을 수 없습니다.';
                  console.log('현재 위치 정보:', address);

                  const district = address.split(' ')[1]; // 주소의 두 번째 부분이 구/동
                  props.onChange(district); // 부모 컴포넌트에 구/동 정보 전달
                  navigateToLanding(district);
                } else {
                  console.error('주소 변환 실패:', status);
                }
              });
            });
          },
          (error) => {
            console.error('위치 정보를 가져오는 데 실패했습니다:', error);
          }
        );
      } else {
        console.error('이 브라우저에서는 Geolocation API를 지원하지 않습니다.');
      }
    } catch (error) {
      console.error('Kakao Maps API 로드 중 오류:', error);
    }
  };


  return (
    <div className='flex gap-3 items-center'>
      <Select
        showSearch
        value={props.value || null}
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
      <button onClick={handleGetCurrentLocation}>
        <img src={locationIcon} width={'20px'} />
      </button>
    </div>
  );
};

function Header() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<typeof store.dispatch>();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userRole = useSelector((state: RootState) => state.auth.userRole);

  const loggedUser = localStorage.getItem('userEmail');
  let user, banker;
  if (loggedUser) {
    user = userRole == 'C' ? findUser(loggedUser) : undefined;
    banker = userRole == 'B' ? findBanker(loggedUser) : undefined;
  }

  useEffect(() => {
    const storedLocation = localStorage.getItem('userLocation');
    if (storedLocation) {
      setSearchValue(storedLocation); // localStorage에서 userLocation 값 가져와 초기값 설정
    }
    setDrawerVisible(false);
  }, [navigate, isLoggedIn]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('interestLocations')
    message.success('로그아웃 성공!');
    setSearchValue('');
    navigate('/');
  };

  const handleSearchValueChange = (newValue: string) => {
    setSearchValue(newValue);
    localStorage.setItem('userLocation', newValue);
  };

  return (
    <header className="w-screen px-6 py-3 bg-white border-b bold-header">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="logo" className="w-32" />
        </Link>

        {/* 햄버거 메뉴 버튼 */}
        <Button
          type="text"
          className="lg:hidden"
          icon={<MenuOutlined />}
          onClick={() => setDrawerVisible(true)}
        />

        {/* 큰 화면 네비게이션 */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex gap-8">
            <li>
              <Link to='/qna'>Q&A</Link>
            </li>
            <li>
              <Link to='/community'>커뮤니티</Link>
            </li>
            <li>
              <Link to='/district/광진구'>우주하나</Link>
            </li>
            <li>
              <Link to='/findbank'>영업점 찾기</Link>
            </li>
          </ul>
        </nav>

        {/* 큰 화면 검색 및 로그인/로그아웃 */}
        <div className="hidden lg:flex ml-auto items-center gap-6">
          {userRole !== 'B' && (
            <SearchInput
              placeholder="지역을 입력하세요"
              style={{ width: 200 }}
              value={ searchValue || ''}
              onChange={handleSearchValueChange}
            />
          )}
          {isLoggedIn ? (
            <div className="flex items-center gap-6">
              <span className="cursor-pointer" onClick={handleLogout}>
                로그아웃
              </span>
              <Link to="/my/profile" className="flex items-center gap-2">
                <img src={userIcon} alt="user icon" width={35} />
                {user && (<span>{user.nickname}</span>)}
                {banker && (<span>{banker.name}</span>)}
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/register">회원가입</Link>
              <Link to="/login">로그인</Link>
            </div>
          )}
        </div>
      </div>

      {/* Drawer for 햄버거 메뉴 */}
      <Drawer
        title="메뉴"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <nav className="flex flex-col gap-4">
          <Link to="/qna" onClick={() => setDrawerVisible(false)}>
            Q&A
          </Link>
          <Link to="/community" onClick={() => setDrawerVisible(false)}>
            커뮤니티
          </Link>
          <Link to="/realty" onClick={() => setDrawerVisible(false)}>
            부동산
          </Link>
          <Link to="/findbank" onClick={() => setDrawerVisible(false)}>
            영업점 찾기
          </Link>
          
          {isLoggedIn ? (
            <>
              <p className="cursor-pointer" onClick={handleLogout}>
                로그아웃
              </p>
              <Link to="/my/profile">마이페이지</Link>
            </>
          ) : (
            <>
              <Link to="/register">회원가입</Link>
              <Link to="/login">로그인</Link>
            </>
          )}
        </nav>
      </Drawer>
    </header>
  );
}

export default Header;
