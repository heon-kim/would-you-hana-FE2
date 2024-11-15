import React, { useEffect, useState } from 'react';
import seoulDistricts from '../../assets/location/seoul_districts.json'; // Adjust path as needed

const SetDistrict = () => {
  const [mapInstance, setMapInstance] = useState(null);
  const [inputDistrict, setInputDistrict] = useState('');
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [polygon, setPolygon] = useState(null);
  const [searchedDistrict, setSearchedDistrict] = useState(null);

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
