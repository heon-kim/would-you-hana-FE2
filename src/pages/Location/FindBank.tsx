import React, { useEffect, useState } from 'react';
import markerImg from '../../assets/img/mark.png';

const FindBank = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [positions, setPositions] = useState([]); // Store fetched locations
  const [userLocation, setUserLocation] = useState(null); // Store user's current location
  const [userDistrict, setUserDistrict] = useState(''); // Store user's district information

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userLatLng);

          // Load Kakao Maps API for reverse geocoding
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
          console.error("Error fetching location:", error);
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

          const places = new window.kakao.maps.services.Places();

          // Create a custom overlay for user's location
          const userMarker = document.createElement('div');
          userMarker.style.width = '15px';
          userMarker.style.height = '15px';
          userMarker.style.backgroundColor = '#FF0000';
          userMarker.style.borderRadius = '50%';
          userMarker.style.border = '2px solid white';
          userMarker.style.boxShadow = '0px 0px 6px rgba(255, 0, 0, 0.5)';

          new window.kakao.maps.CustomOverlay({
            map: map,
            position: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
            content: userMarker,
            yAnchor: 0.5,
            xAnchor: 0.5,
          });

          places.keywordSearch(`하나은행 ${userDistrict}`, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const locations = result.map((place) => ({
                title: place.place_name,
                latlng: new window.kakao.maps.LatLng(place.y, place.x),
                content: `
                  주소: ${place.road_address_name || place.address_name}<br/>
                  전화번호: ${place.phone || '정보 없음'}<br/>
                `,
              }));
              setPositions(locations);

              locations.forEach((location) => {
                const markerImage = new window.kakao.maps.MarkerImage(
                  markerImg,
                  new window.kakao.maps.Size(30, 35)
                );
                const marker = new window.kakao.maps.Marker({
                  map: map,
                  position: location.latlng,
                  title: location.title,
                  image: markerImage,
                });

                window.kakao.maps.event.addListener(marker, 'click', () => {
                  setSelectedLocation(location);
                });
              });
            } else {
              console.error('No Hana Bank branches found.');
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
        <div style={{ padding: '10px', textAlign: 'center' }}>
          {/* <p>현재 위치: {userDistrict}</p> */}
        </div>
      </div>
    </div>
  );
};

export default FindBank;
