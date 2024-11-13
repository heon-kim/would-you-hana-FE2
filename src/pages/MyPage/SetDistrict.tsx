import React, { useEffect, useState } from 'react';
import sigData from './sig.json';

const SetDistrict = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [inputDistrict, setInputDistrict] = useState('');
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [polygon, setPolygon] = useState(null);

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
              const mapContainer = document.getElementById('map');
              const mapOption = {
                center: new window.kakao.maps.LatLng(userLatLng.lat, userLatLng.lng),
                level: 5,
              };
              const map = new window.kakao.maps.Map(mapContainer, mapOption);
              setMapInstance(map);
            });
          };
        },
        (error) => {
          console.error("Error fetching location:", error);
          setUserLocation({ lat: 37.5665, lng: 126.9780 });
        }
      );
    } else {
      setUserLocation({ lat: 37.5665, lng: 126.9780 });
    }
  }, []);

  const searchDistrict = () => {
    if (!inputDistrict.trim() || !window.kakao.maps) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(inputDistrict, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        mapInstance.setCenter(coords);
        setSearchedLocation({ name: inputDistrict, coords: { lat: result[0].y, lng: result[0].x } });
        drawPolygon(inputDistrict);
      } else {
        alert('지역을 찾을 수 없습니다. 올바른 지역명을 입력해 주세요.');
      }
    });
  };

  const drawPolygon = (districtName) => {
    if (!window.kakao.maps || !mapInstance) return;

    const districtData = sigData.features.find(
      (d) => d.properties.SIG_KOR_NM === districtName
    );

    if (!districtData) {
      alert("해당 구의 정보를 찾을 수 없습니다.");
      return;
    }

    const path = districtData.geometry.coordinates[0].map(
      (coord) => new window.kakao.maps.LatLng(coord[1], coord[0])
    );

    if (polygon) polygon.setMap(null);

    const newPolygon = new window.kakao.maps.Polygon({
      map: mapInstance,
      path: path,
      strokeWeight: 2,
      strokeColor: '#FF3DE5',
      strokeOpacity: 0.8,
      fillColor: '#FF8AEF',
      fillOpacity: 0.6,
    });

    setPolygon(newPolygon);
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

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '5%' }}>
      <div
        style={{
          width: '50%',
          height: '500px',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
        id="map"
      ></div>

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
