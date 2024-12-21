// @ts-nocheck
import React, { useEffect, useState, useCallback } from 'react';
import seoulDistricts from '../../assets/location/seoul_districts.json'; // Adjust path as needed
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../hoc/actions';
import iconSearch from '../../assets/img/icon_search.png';
import iconPlus from '../../assets/img/icon_plus.svg';
import store from '../../hoc/store';
import { message } from 'antd';
import { userService } from '../../services/user.service';
import { AxiosResponse } from 'axios';


const SetDistrict = () => {
  const [mapInstance, setMapInstance] = useState(null);
  const [inputDistrict, setInputDistrict] = useState('');
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [polygon, setPolygon] = useState(null);
  const [searchedDistrict, setSearchedDistrict] = useState(null);

  const dispatch = useDispatch<typeof store.dispatch>();
  interface InterestLocationsDTO {
    location: string;
  }

  // 페이지에 새로 접근 시 동작 => 회원 정보를 가져오고, 회원의 favoriteLocations 배열을 selectedDistricts에 넣어주기
  useEffect(() => {
    const fetchUserData = async () => {
      const loggedUser = localStorage.getItem('userEmail');
      if (loggedUser) {
        try {
          // 백엔드에서 관심지역 받아오기(get)
          const userId = localStorage.getItem('userId');
          const response: AxiosResponse<InterestLocationsDTO[]> = await userService.getInterestLocationList(userId);

          // selectedDistricts에 받아온 데이터 세팅
          if (response && response.data) {
            console.log('Response Data: ', response.data);
            localStorage.setItem('interestLocations', JSON.stringify(response.data));
            const favoriteLocations: string[] = JSON.parse(localStorage.getItem('interestLocations') || '[성동구]');
            setSelectedDistricts(favoriteLocations); // selectedDistricts를 업데이트
            const token: string = localStorage.getItem('authToken');
            const role: string = 'C';
            const location: string = favoriteLocations[0];
            const email: string = localStorage.getItem('userEmail');
            const nickName: string = localStorage.getItem('nickName');
            dispatch(loginSuccess(token, Number(userId), email, role, location, nickName));
          }
          console.log('유저 데이터를 성공적으로 가져왔습니다.');
        } catch (error) {
          console.error('유저 데이터를 가져올 수 없습니다.', error); // 에러 처리 추가
        }
      }
    };

    fetchUserData();
  }, [dispatch]);

  // 삭제 버튼이 눌렸을 때 데이터 다시 받아오기
  useEffect(() => {
    if (isDelete) {
      const fetchUserData = async () => {
        const loggedUser = localStorage.getItem('userEmail');
        if (loggedUser) {
          try {
            const userId = localStorage.getItem('userId');
            const response: AxiosResponse<InterestLocationsDTO[]> = await userService.getInterestLocationList(userId);
            if (response && response.data) {
              localStorage.setItem('interestLocations', JSON.stringify(response.data));
              const favoriteLocations: string[] = JSON.parse(localStorage.getItem('interestLocations') || '[성동구]');
              setSelectedDistricts(favoriteLocations); // selectedDistricts를 업데이트
              // localStorage.setItem('userLocation',favoriteLocations[0]);
              const token: string = localStorage.getItem('authToken');
            const role: string = 'C';
            const location: string = favoriteLocations[0];
            const email: string = localStorage.getItem('userEmail');
            const nickName: string = localStorage.getItem('nickName');
            dispatch(loginSuccess(token, Number(userId), email, role, location, nickName));
              
            }
          } catch (error) {
            console.error('유저 데이터를 가져올 수 없습니다.', error);
          }
        }
      };

      fetchUserData();
      setIsDelete(false);
      
    }
  }, [isDelete]);

    // 추가 버튼이 눌렸을 때 데이터 다시 받아오기
  useEffect(() => {
    if (isAdd) {
      const fetchUserData = async () => {
        const loggedUser = localStorage.getItem('userEmail');
        if (loggedUser) {
          try {
            const userId = localStorage.getItem('userId');
            const response: AxiosResponse<InterestLocationsDTO[]> = await userService.getInterestLocationList(userId);
            if (response && response.data) {
              localStorage.setItem('interestLocations', JSON.stringify(response.data));
              const favoriteLocations: string[] = JSON.parse(localStorage.getItem('interestLocations') || '[성동구]');
              setSelectedDistricts(favoriteLocations); // selectedDistricts를 업데이트
              
              
            }
          } catch (error) {
            console.error('유저 데이터를 가져올 수 없습니다.', error);
          }
        }
      };

      fetchUserData();
      setIsAdd(false);
      
    }
  }, [isAdd]);


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
    
    //console.log(typeof(district.properties.SIG_KOR_NM));
    if (district) {
      //setSearchedDistrict(district);
      setSearchedDistrict(district.properties.SIG_KOR_NM);

      const coordinates = district.geometry.coordinates[0].map(
        (coord) => new window.kakao.maps.LatLng(coord[1], coord[0])
      );

      const center = calculateCenter(coordinates);
      mapInstance.setCenter(center);

      drawDistrictPolygon(coordinates);
    } else {
      message.warning('지역을 찾을 수 없습니다. 올바른 지역명을 입력해 주세요.');
    }
  };

  const addDistrict = (async () => {
    // 선택된 지역구 리스트가 3개 이상이면
    if (selectedDistricts.length >= 3) {
      message.warning('최대 3개의 지역구만 추가할 수 있습니다.');
      return;
    }
  
    // 검색된 지역이 있다면, 해당 지역이 이미 추가되었는지 확인
    if (searchedDistrict) {
      const isAlreadySelected = selectedDistricts.some(
        (d) => d === searchedDistrict
      );
  
      // 이미 추가된 지역이 아니라면, 지역 추가
      if (!isAlreadySelected) {
        const customerId = localStorage.getItem('userId');
        const location = searchedDistrict;
        const item: InterestLocationRequestDTO = {
          customerId,
          location
        };
  
        try {
          // 삭제 요청 후 지역 추가
          await userService.addSpecificInterestLocation(item);
          setIsAdd(true);
          setSelectedDistricts((prevSelectedDistricts) => [
            ...prevSelectedDistricts,
            searchedDistrict
          ]);
          setInputDistrict('');
          setSearchedDistrict(null);
          message.success('관심 지역이 성공적으로 추가되었습니다.');
        } catch (error) {
          message.error('지역 추가 중 오류가 발생했습니다.');
          console.error(error);
        }
      
      } else {
        message.warning('이미 추가된 지역입니다.');
      }
    } else {
      message.warning('먼저 검색 후 추가하세요.');
    }
  });


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
      strokeColor: '#498DF7',
      strokeOpacity: 0.8,
      fillColor: '#498DF7',
      fillOpacity: 0.4,
    });
    setPolygon(newPolygon);
  };



  const removeDistrict = useCallback(async (districtName) => {
    if (selectedDistricts.length === 1) {
      message.warning('최소 하나의 관심지역은 설정되어 있어야 합니다.');
      return;
    }
    const customerId = localStorage.getItem('userId');
    const location = districtName;
    const item: InterestLocationRequestDTO ={
      customerId,
      location
    }

    try {
      await userService.deleteSpecificInterestLocation(item);
      setIsDelete(true);  // Trigger the useEffect when a district is deleted
      setSelectedDistricts((prevDistricts) =>
        prevDistricts.filter((district) => district !== districtName)
      );
      message.success('관심 지역이 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('관심 지역 삭제 중 오류가 발생했습니다.', error);
      message.error('관심 지역 삭제에 실패했습니다.');
    }
  }, [selectedDistricts]);

  return (
    <>
      <div
        style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}
      >
        관심 지역 설정

      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '5%' }}>



        <div
          style={{
            width: '50%',
            height: '500px',
            marginBottom: '5%',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            position: 'relative',
            border: '1px solid #F3F5F7'
          }}
          id="map"
        />

        <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', width: '35%' }}>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="관심 지역 검색 (ex: 광진구, 성동구)"
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
              <img src={iconSearch} style={{ width: '20px' }} />
            </button>
            <button
              onClick={addDistrict}
              style={{

                padding: '7px',
                borderRadius: '5px',
                backgroundColor: '#808080',
                color: '#FFFFFF',
                cursor: 'pointer',
              }}
            >
              <img src={iconPlus} />
            </button>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '15px'
          }}>
            {selectedDistricts.map((district, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px ',
                  borderRadius: '15px',
                  backgroundColor: '#54A0A1',
                  color: '#ffffff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                <span style={{ marginLeft: '10%', fontSize: '17px' }}>{district}</span>
                <button
                  onClick={() => removeDistrict(district)}
                  style={{
                    marginLeft: 'auto',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '20px',
                  }}
                >
                  ×
                </button>
              </div>

            ))}
            <div style={{ fontSize: '17px', textAlign: 'center', marginTop: '20px' }}>
              📢 관심 지역은 최대 3개까지 등록 가능합니다.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetDistrict;
