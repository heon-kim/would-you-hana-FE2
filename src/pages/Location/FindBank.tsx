import React, { useEffect, useState } from 'react';
import markerImg from '../../assets/img/mark.png';
import markerAtmImg from '../../assets/img/mark_atm.png';
import ReservationModal from '../../components/ReservationModal';
import iconLocation from '../../assets/img/icon_location.svg';
import iconLocationWhite from '../../assets/img/icon_location_white.svg';
import hwayangImg from '../../assets/img/bank/hwayang.jpg';
import seongsuImg from '../../assets/img/bank/seongsu.png';
import seouluuuuuupImg from '../../assets/img/bank/seoulsuuuuuup.jpg';

const FindBank = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [positions, setPositions] = useState([]);
  const [atmPositions, setATMPositions] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [userDistrict, setUserDistrict] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBranches, setShowBranches] = useState(true);
  const [showATMs, setShowATMs] = useState(true);
  const [mapInstance, setMapInstance] = useState(null);
  const [isBranchActive, setIsBranchActive] = useState(false);
  const [isATMActive, setIsATMActive] = useState(false);
  const [isLocationActive, setIsLocationActive] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getOperatingStatus = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;
    const openingTime = 9 * 60;
    const closingTime = 16 * 60;

    if (currentTime < openingTime) {
      return '영업 전';
    } else if (currentTime >= openingTime && currentTime < closingTime) {
      return '영업 중';
    } else {
      return '영업 종료';
    }
  };

  const getBranchImage = (branchName) => {
    switch (branchName) {
      case '하나은행 화양동지점':
        return hwayangImg;
      case '하나은행 성수역지점':
        return seongsuImg;
      case '하나은행 서울숲지점':
        return seouluuuuuupImg;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (mapInstance && userLocation) {
      window.kakao.maps.event.addListener(mapInstance, 'center_changed', () => {
        const center = mapInstance.getCenter();
        const isCentered =
          Math.abs(center.getLat() - userLocation.lat) < 0.0001 &&
          Math.abs(center.getLng() - userLocation.lng) < 0.0001;
        setIsLocationActive(isCentered);
      });

      // 사용자 위치를 빨간 점으로 표시
      const userMarkerElement = document.createElement('div');
      userMarkerElement.style.width = '15px';
      userMarkerElement.style.height = '15px';
      userMarkerElement.style.backgroundColor = 'red';
      userMarkerElement.style.border = '2px solid white';
      userMarkerElement.style.borderRadius = '50%';
      userMarkerElement.style.boxShadow = '0px 0px 6px rgba(255, 0, 0, 0.5)';
      userMarkerElement.style.position = 'relative';

      new window.kakao.maps.CustomOverlay({
        position: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
        content: userMarkerElement,
        map: mapInstance,
        zIndex: 3,
      });
    }
  }, [mapInstance, userLocation]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userLatLng);

          const script = document.createElement('script');
          script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=26b73c9fe72dd7a39fc3df547c6175f2&libraries=services&autoload=false`;
          document.head.appendChild(script);

          script.onload = () => {
            window.kakao.maps.load(() => {
              const geocoder = new window.kakao.maps.services.Geocoder();
              geocoder.coord2RegionCode(userLatLng.lng, userLatLng.lat, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  const districtInfo = result.find((region) => region.region_type === 'H');
                  if (districtInfo) setUserDistrict(districtInfo.address_name);
                }
              });
            });
          };
        },
        (error) => {
          console.error('Error fetching location:', error);
          setUserLocation({ lat: 37.5665, lng: 126.9780 });
        }
      );
    } else {
      setUserLocation({ lat: 37.5665, lng: 126.9780 });
    }
  }, []);

  useEffect(() => {
    if (!userLocation) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=26b73c9fe72dd7a39fc3df547c6175f2&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      try {
        window.kakao.maps.load(() => {
          const mapContainer = document.getElementById('map');
          const mapOption = {
            center: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
            level: 5,
          };
          const map = new window.kakao.maps.Map(mapContainer, mapOption);
          setMapInstance(map);

          const places = new window.kakao.maps.services.Places();

          // Branch 검색
          places.keywordSearch(`${userDistrict} 하나은행`, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const locations = result.map((place) => ({
                title: place.place_name,
                lat: place.y,
                lng: place.x,
                latlng: new window.kakao.maps.LatLng(place.y, place.x),
                image: getBranchImage(place.place_name),
                content: `
                  주소: ${place.road_address_name || place.address_name}<br/>
                  전화번호: ${place.phone || '정보 없음'}<br/>
                  영업시간: 09:00 ~ 16:00<br/>
                  현재 상태: <span style="color: ${getOperatingStatus() === '영업 중' ? 'green' : 'red'}">${getOperatingStatus()}</span><br/>
                  <a href="${place.place_url}" target="_blank" style="display: inline-block; margin-top: 5px; padding: 8px 12px; text-decoration: none; color: white; background-color: #008485; border-radius: 5px; font-weight: bold;">상세보기</a><br/>
                `,
                type: 'branch',
              }));
              setPositions(locations);

              locations.forEach((location) => {
                const markerImage = new window.kakao.maps.MarkerImage(
                  markerImg,
                  new window.kakao.maps.Size(30, 35)
                );
                const marker = new window.kakao.maps.Marker({
                  map: showBranches ? map : null,
                  position: location.latlng,
                  title: location.title,
                  image: markerImage,
                  zIndex: 2,
                });

                window.kakao.maps.event.addListener(marker, 'click', () => {
                  setSelectedLocation(location);
                  map.panTo(location.latlng);
                });

                location.marker = marker;
              });
            } else {
              console.error('No Hana Bank branches found.');
            }
          });

          // ATM 검색
          places.keywordSearch(`${userDistrict} 하나은행 ATM`, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const atmLocations = result.map((place) => ({
                title: place.place_name,
                lat: place.y,
                lng: place.x,
                latlng: new window.kakao.maps.LatLng(place.y, place.x),
                content: `
                  주소: ${place.road_address_name || place.address_name}<br/>
                  <a href="${place.place_url}" target="_blank" style="display: inline-block; margin-top: 5px; padding: 8px 12px; text-decoration: none; color: white; background-color: #008485; border-radius: 5px; font-weight: bold;">상세보기</a><br/>
                `,
                type: 'atm',
              }));
              setATMPositions(atmLocations);

              atmLocations.forEach((location) => {
                const markerImage = new window.kakao.maps.MarkerImage(
                  markerAtmImg,
                  new window.kakao.maps.Size(30, 35)
                );
                const marker = new window.kakao.maps.Marker({
                  map: showATMs ? map : null,
                  position: location.latlng,
                  title: location.title,
                  image: markerImage,
                  zIndex: 1,
                });

                window.kakao.maps.event.addListener(marker, 'click', () => {
                  setSelectedLocation(location);
                  map.panTo(location.latlng);
                });

                location.marker = marker;
              });
            } else {
              console.error('No Hana Bank ATMs found.');
            }
          });
        });
      } catch (error) {
        console.error('Error loading the Kakao Maps script:', error);
      }
    };

    script.onerror = () => {
      console.error('Failed to load Kakao Maps SDK');
    };
  }, [userLocation, userDistrict]);

  const toggleBranchMarkers = () => {
    setShowBranches((prev) => !prev);
    setIsBranchActive((prev) => !prev);
    positions.forEach((location) => {
      location.marker.setMap(showBranches ? null : mapInstance);
    });
  };

  const toggleATMMarkers = () => {
    setShowATMs((prev) => !prev);
    setIsATMActive((prev) => !prev);
    atmPositions.forEach((location) => {
      location.marker.setMap(showATMs ? null : mapInstance);
    });
  };

  const goToUserLocation = () => {
    if (mapInstance && userLocation) {
      mapInstance.panTo(new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng));
      setIsLocationActive(true);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '5%' }}>
      <div style={{ width: '50%', height: '500px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} id="map">
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: '1000', display: 'flex', flexDirection: 'column' }}>
          <button
            onClick={toggleATMMarkers}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: isATMActive ? '#FFFFFF' : '#008485',
              color: isATMActive ? '#008485' : '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
              marginBottom: '5px',
            }}
          >
            ATM
          </button>

          <button
            onClick={toggleBranchMarkers}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: isBranchActive ? '#FFFFFF' : '#008485',
              color: isBranchActive ? '#008485' : '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
              marginBottom: '5px',
            }}
          >
            영업점
          </button>

          <button
            onClick={goToUserLocation}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: isLocationActive ? '#008485' : '#FFFFFF',
              color: isLocationActive ? '#FFFFFF' : '#008485',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={isLocationActive ? iconLocationWhite : iconLocation}
              alt="Location Icon"
              style={{ width: '24px', height: '24px' }}
            />
          </button>
        </div>
      </div>

      <div
        style={{
          marginLeft: '20px',
          padding: '0',
          border: '1px solid #ccc',
          borderRadius: '10px',
          width: '300px',
          height: '500px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* 고정된 헤더 */}
        <div
          style={{
            backgroundColor: '#008485',
            padding: '12px',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
          }}
        >
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '500',
              color: '#fff',
            }}
          >
            {selectedLocation ? selectedLocation.title : '상세 정보'}
          </h3>
        </div>

        {/* 스크롤 가능한 본문 */}
        <div
          style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
          }}
        >
          {selectedLocation ? (
            <>
              {selectedLocation.image && (
                <img
                  src={selectedLocation.image}
                  alt={selectedLocation.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '10px',
                    marginBottom: '10px',
                  }}
                />
              )}
              <div style={{ marginTop: '10px' }} dangerouslySetInnerHTML={{ __html: selectedLocation.content }} />
            </>
          ) : (
            <p style={{ color: '#888' }}>마커를 클릭하면 <br></br> 여기에 상세 정보가 표시됩니다.</p>
          )}
        </div>

        <div style={{ padding: '10px', textAlign: 'center' }}>
          {selectedLocation && selectedLocation.type === 'branch' && (
            <button
              style={{
                width: '100%',
                backgroundColor: '#008485',
                borderRadius: '3px',
                padding: '5px',
                color: 'white',
              }}
              onClick={showModal}
            >
              예약하기
            </button>
          )}
        </div>
      </div>
      <ReservationModal isOpen={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
    </div>
  );
};

export default FindBank;
