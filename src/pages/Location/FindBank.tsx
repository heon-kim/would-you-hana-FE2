import React, { useEffect, useState } from 'react';
import markerImg from '../../assets/img/mark.png';

const FindBank = () => {
  const [selectedLocation, setSelectedLocation] = useState(null); // 선택된 위치 정보 상태

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=26b73c9fe72dd7a39fc3df547c6175f2&autoload=false`; // YOUR_APP_KEY를 실제 API 키로 대체하세요
    document.head.appendChild(script);

    script.onload = () => {
      try {
        window.kakao.maps.load(() => {
          const container = document.getElementById('map'); // 지도를 표시할 div
          const options = {
            center: new window.kakao.maps.LatLng(37.544951689449746, 127.05651240838867), // 알파코 좌표
            level: 4, // 확대 레벨
          };
          const map = new window.kakao.maps.Map(container, options); // 지도 생성

          // 하나은행 지점 정보를 포함한 마커를 표시할 위치와 title 객체 배열입니다
          const positions = [
            {
              title: '하나은행 성수지점',
              latlng: new window.kakao.maps.LatLng(37.5451222, 127.0571291),
              content: `
                주소: 서울특별시 성동구 성수이로 73<br/>
                전화번호: 02-1234-5678<br/>
                운영시간: 월-금 09:00 ~ 16:00<br/>
                <br/>방문 고객을 위한 다양한 금융 서비스와 친절한 상담을 제공합니다.
              `
            },
            {
              title: '하나은행 서울숲지점',
              latlng: new window.kakao.maps.LatLng(37.5454553, 127.0452413),
              content: `
                주소: 서울특별시 성동구 서울숲 1길 3<br/>
                전화번호: 02-8765-4321<br/>
                운영시간: 월-금 09:00 ~ 16:00<br/>
                <br/>고객 맞춤형 금융 상품을 제공하며, 편리한 온라인 뱅킹 서비스도 지원합니다.
              `
            },
          ];

          for (let i = 0; i < positions.length; i++) {
            const imageSize = new window.kakao.maps.Size(30, 35); 
            const markerImage = new window.kakao.maps.MarkerImage(markerImg, imageSize); 
            const marker = new window.kakao.maps.Marker({
              map: map,
              position: positions[i].latlng,
              title: positions[i].title,
              image: markerImage 
            });

            window.kakao.maps.event.addListener(marker, 'click', function () {
              setSelectedLocation(positions[i]); 
            });
          }
        });
      } catch (error) {
        console.error('Error loading the Kakao Maps script:', error);
      }
    };

    script.onerror = () => {
      console.error('Failed to load Kakao Maps SDK');
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '5%' }}>
      <div style={{ width: '50%', height: '500px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} id="map"></div>
      <div style={{ marginLeft: '20px', padding: '0', border: '1px solid #ccc', borderRadius: '10px', width: '300px', height: '500px', backgroundColor: '#f9f9f9', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ backgroundColor: '#008485', padding: '10px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '500', color: '#fff' }}>{selectedLocation ? selectedLocation.title : '상세 정보'}</h3>
        </div>
        {selectedLocation ? (
          <div style={{ padding: '20px' }}>
            <div style={{ marginTop: '10px' }} dangerouslySetInnerHTML={{ __html: selectedLocation.content }} />
          </div>
        ) : (
          <p style={{ padding: '20px', color: '#888' }}>마커를 클릭하면 상세 정보가 여기에 표시됩니다.</p>
        )}
      </div>
    </div>
  );
};

export default FindBank;
