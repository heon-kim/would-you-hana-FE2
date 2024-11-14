import React, { useEffect, useState } from 'react';
import iconLocation from '../../assets/img/icon_location.svg';
import iconLocationWhite from '../../assets/img/icon_location_white.svg';

const SetDistrict = () => {
  const [mapInstance, setMapInstance] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [inputDistrict, setInputDistrict] = useState('');
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isLocationActive, setIsLocationActive] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=26b73c9fe72dd7a39fc3df547c6175f2&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 5,
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        setMapInstance(map);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
              const userLatLng = new window.kakao.maps.LatLng(lat, lng);
              setUserLocation(userLatLng);
              map.setCenter(userLatLng);

              const userMarker = document.createElement('div');
              userMarker.style.width = '15px';
              userMarker.style.height = '15px';
              userMarker.style.backgroundColor = '#FF0000';
              userMarker.style.borderRadius = '50%';
              userMarker.style.border = '2px solid white';
              userMarker.style.boxShadow = '0px 0px 6px rgba(255, 0, 0, 0.5)';

              new window.kakao.maps.CustomOverlay({
                map: map,
                position: userLatLng,
                content: userMarker,
                yAnchor: 0.5,
                xAnchor: 0.5,
              });

              // Check if map is centered on user’s location
              window.kakao.maps.event.addListener(map, 'center_changed', () => {
                const center = map.getCenter();
                const isCentered =
                  Math.abs(center.getLat() - userLatLng.getLat()) < 0.0001 &&
                  Math.abs(center.getLng() - userLatLng.getLng()) < 0.0001;
                setIsLocationActive(isCentered);
              });
            },
            (error) => {
              console.error("현재 위치를 가져오는 데 실패했습니다.", error);
            }
          );
        } else {
          console.warn("Geolocation이 지원되지 않는 브라우저입니다.");
        }
      });
    };

    script.onerror = () => {
      console.error("Kakao Maps SDK 로드에 실패했습니다.");
    };
  }, []);

  const searchDistrict = () => {
    if (!inputDistrict.trim() || !window.kakao.maps) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(inputDistrict, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        mapInstance.setCenter(coords);
        setSearchedLocation({ name: inputDistrict, coords: { lat: result[0].y, lng: result[0].x } });
      } else {
        alert('지역을 찾을 수 없습니다. 올바른 지역명을 입력해 주세요.');
      }
    });
  };

  const addDistrict = () => {
    if (districts.length >= 3) {
      alert("최대 3개의 지역구만 추가할 수 있습니다.");
      return;
    }

    if (searchedLocation) {
      setDistricts((prevDistricts) => [...prevDistricts, searchedLocation]);
      setSearchedLocation(null);
      setInputDistrict('');
    } else {
      alert("먼저 검색을 통해 위치를 확인해 주세요.");
    }
  };

  const toggleUserLocation = () => {
    if (mapInstance && userLocation) {
      mapInstance.panTo(userLocation);
      setIsLocationActive(true);
    }
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
      >
        <button
          onClick={toggleUserLocation}
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
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
            zIndex: 10,
          }}
        >
          <img
            src={isLocationActive ? iconLocationWhite : iconLocation}
            alt="Location Icon"
            style={{ width: '24px', height: '24px' }}
          />
        </button>
      </div>

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
              marginRight: '5px',
            }}
          >
            검색
          </button>
          <button
            onClick={addDistrict}
            style={{
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: '#008485',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            추가
          </button>
        </div>

        <div>
          {districts.map((district, index) => (
            <div key={index} style={{ padding: '5px', borderBottom: '1px solid #eee' }}>
              {district.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SetDistrict;
