import React, { useEffect, useState } from 'react';
import seoulDistricts from '../../assets/location/seoul_districts.json'; // Adjust path as needed
import { findUser, updateUser } from '../../utils/userStorage';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../hoc/actions';
import store from '../../hoc/store';

const SetDistrict = () => {
  const [mapInstance, setMapInstance] = useState(null);
  const [inputDistrict, setInputDistrict] = useState('');
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [polygon, setPolygon] = useState(null);
  const [searchedDistrict, setSearchedDistrict] = useState(null);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch<typeof store.dispatch>();

  // 페이지에 새로 접근 시 동작 => 회원 정보를 가져오고, 회원의 favoriteLocations 배열을 selectedDistricts에 넣어주기
  useEffect(() => {
    const fetchUserData = async () => {
      const loggedUser = localStorage.getItem('userEmail');
      if (loggedUser) {
        try {
          const userData = await findUser(loggedUser); // `await` 추가
          if (userData) {
            setUser(userData);

            // favoriteLocations가 배열이라면, 이 배열을 기반으로 selectedDistricts 업데이트
            if (userData.favoriteLocations) {

              const districts = userData.favoriteLocations.map((districtName) => {
                // 해당 지역 이름에 대한 추가 정보를 seoulDistricts에서 찾아서 반환
                const district = seoulDistricts.features.find(
                  (d) => d.properties.SIG_KOR_NM === districtName
                );
                return district || null; // 찾은 지역 데이터가 없으면 null 반환
              }).filter(district => district !== null); // null 값 필터링

              setSelectedDistricts(districts); // selectedDistricts를 업데이트

              // 관심지역을 가져온 후, 헤더에는 관심지역의 0번째 인덱스가 반영되도록 초기 설정
              const token: string = 'generatedAuthToken';
              const role: string = 'C';
              const location: string = userData.favoriteLocations[0];
              dispatch(loginSuccess(token, userData.email, role, location));
            }

            console.log('유저 데이터를 성공적으로 가져왔습니다.', userData);
          }
        } catch (error) {
          console.error('유저 데이터를 가져올 수 없습니다.', error); // 에러 처리 추가
        }
      } else {
        console.log('로그인되지 않은 유저입니다.');
      }
    };

    fetchUserData();
  }, []);

  // selectedDistricts 배열이 변경될 때마다 실행
  // user가 존재하고, selectedDistricts의 길이가 user.favoriteLocations의 길이와 다를 때에만 이 useEffect가 실행됨. 이는 무한 루프를 방지하기 위해 추가된 조건
  // selectedDistricts가 갱신될 때, selectedDistricts에 있는 지역구 객체를 SIG_KOR_NM 속성(지역 이름)으로 매핑하여 새로운 favoriteLocations 배열을 만듬.
  // 기존 user 상태를 복사한 후, favoriteLocations 속성을 갱신된 selectedDistricts에 기반한 배열로 업데이트한 updatedUser 객체를 만듭니다.
  // setUser(updatedUser)를 호출하여 user 상태를 새로운 사용자 데이터로 업데이트합니다.
  // updateUser(updatedUser)를 호출하여 로컬 저장소 등 외부 데이터 저장소에 갱신된 사용자 데이터를 반영합니다.
  useEffect(() => {
    if (user && selectedDistricts.length !== user.favoriteLocations?.length) {
      const updatedUser = {
        ...user,
        favoriteLocations: selectedDistricts.map((d) => d.properties.SIG_KOR_NM),
        location: selectedDistricts[0].properties.SIG_KOR_NM,
      };
      setUser(updatedUser);
      updateUser(updatedUser);

      // 관심지역 변경사항이 있을경우, 헤더에는 관심지역의 0번째 인덱스로 자동으로 변경되도록 설정
      const token: string = 'generatedAuthToken';
      const role: string = 'C';
      const location: string = updatedUser.favoriteLocations[0];
      dispatch(loginSuccess(token, updatedUser.email, role, location));
    }
  }, [selectedDistricts]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=26b73c9fe72dd7a39fc3df547c6175f2&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 7,
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        setMapInstance(map);
      });
    };

    script.onerror = () => {
      console.error("Kakao Maps SDK 로드에 실패했습니다.");
    };
  }, []);

  const searchDistrict = () => {
    const district = seoulDistricts.features.find(
      (district) => district.properties.SIG_KOR_NM === inputDistrict.trim()
    );

    if (district) {
      setSearchedDistrict(district);

      const coordinates = district.geometry.coordinates[0].map(
        (coord) => new window.kakao.maps.LatLng(coord[1], coord[0])
      );

      const center = calculateCenter(coordinates);
      mapInstance.setCenter(center);

      drawDistrictPolygon(coordinates);
    } else {
      alert('지역을 찾을 수 없습니다. 올바른 지역명을 입력해 주세요.');
    }
  };

  const addDistrict = () => {
    if (selectedDistricts.length >= 3) {
      alert('최대 3개의 지역구만 추가할 수 있습니다.');
      return;
    }

    if (searchedDistrict) {
      const isAlreadySelected = selectedDistricts.some(
        (d) => d.properties.SIG_KOR_NM === searchedDistrict.properties.SIG_KOR_NM
      );

      if (!isAlreadySelected) {
        setSelectedDistricts([...selectedDistricts, searchedDistrict]);
        setInputDistrict('');
        setSearchedDistrict(null);
      } else {
        alert('이미 추가된 지역입니다.');
      }
    } else {
      alert('먼저 검색 후 추가하세요.');
    }
  };

  const calculateCenter = (coordinates) => {
    const totalLat = coordinates.reduce((sum, coord) => sum + coord.getLat(), 0);
    const totalLng = coordinates.reduce((sum, coord) => sum + coord.getLng(), 0);
    const centerLat = totalLat / coordinates.length;
    const centerLng = totalLng / coordinates.length;
    return new window.kakao.maps.LatLng(centerLat, centerLng);
  };

  const drawDistrictPolygon = (coordinates) => {
    if (polygon) {
      polygon.setMap(null);
    }

    const newPolygon = new window.kakao.maps.Polygon({
      map: mapInstance,
      path: coordinates,
      strokeWeight: 2,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      fillColor: '#FF0000',
      fillOpacity: 0.4,
    });
    setPolygon(newPolygon);
  };



  const removeDistrict = (districtName) => {
    if (selectedDistricts.length === 1) {
      alert('최소 하나의 관심지역은 설정되어 있어야 합니다.');
      return;
    }

    setSelectedDistricts(
      selectedDistricts.filter((d) => d.properties.SIG_KOR_NM !== districtName)
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '5%' }}>
      <div
        style={{
          width: '50%',
          height: '500px',
          marginBottom: '5%',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          position: 'relative'
        }}
        id="map"
      />

      <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', width: '20%' }}>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="지역구 검색"
            value={inputDistrict}
            onChange={(e) => setInputDistrict(e.target.value)}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              marginRight: '5px',
            }}
          />
          <button
            onClick={searchDistrict}
            style={{
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: '#008485',
              color: '#FFFFFF',
              cursor: 'pointer',
              marginRight: '5px'
            }}
          >
            검색
          </button>
          <button
            onClick={addDistrict}
            style={{
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: '#808080',
              color: '#FFFFFF',
              cursor: 'pointer',
            }}
          >
            추가
          </button>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          marginTop: '15px'
        }}>
          {selectedDistricts.map((district, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '5px 10px',
                borderRadius: '15px',
                backgroundColor: '#e0f7fa',
                color: '#00796b',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <span>{district.properties.SIG_KOR_NM}</span>
              <button
                onClick={() => removeDistrict(district.properties.SIG_KOR_NM)}
                style={{
                  marginLeft: '8px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#00796b',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SetDistrict;
