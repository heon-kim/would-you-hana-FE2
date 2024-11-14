import React, { useEffect, useState } from 'react';
import markerImg from '../../assets/img/mark.png';
import markerAtmImg from '../../assets/img/mark_atm.png';
import ReservationModal from '../../components/ReservationModal';
import iconLocation from '../../assets/img/icon_location.svg';
import iconLocationWhite from '../../assets/img/icon_location_white.svg';

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
  const [isLocationActive, setIsLocationActive] = useState(true); // 기본값을 true로 설정

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (mapInstance && userLocation) {
      window.kakao.maps.event.addListener(mapInstance, 'center_changed', () => {
        const center = mapInstance.getCenter();
        // 허용 오차(약간의 차이) 범위 내에서 비교
        const isCentered = Math.abs(center.getLat() - userLocation.lat) < 0.0001 &&
                           Math.abs(center.getLng() - userLocation.lng) < 0.0001;
        setIsLocationActive(isCentered);
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
          setMapInstance(map);

          const places = new window.kakao.maps.services.Places();

          // User location marker
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

          // Search for branches
          places.keywordSearch(`${userDistrict} 하나은행`, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const locations = result.map((place) => ({
                title: place.place_name,
                lat: place.y,
                lng: place.x,
                latlng: new window.kakao.maps.LatLng(place.y, place.x),
                content: `
                  주소: ${place.road_address_name || place.address_name}<br/>
                  전화번호: ${place.phone || '정보 없음'}<br/>
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

          // Search for ATMs
          places.keywordSearch(`${userDistrict} 하나은행 ATM`, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const atmLocations = result.map((place) => ({
                title: place.place_name,
                lat: place.y,
                lng: place.x,
                latlng: new window.kakao.maps.LatLng(place.y, place.x),
                content: `
                  주소: ${place.road_address_name || place.address_name}<br/>
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

      <div style={{ marginLeft: '20px', padding: '0', border: '1px solid #ccc', borderRadius: '10px', width: '300px', height: '500px', backgroundColor: '#f9f9f9', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ backgroundColor: '#008485', padding: '12px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
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
          {selectedLocation && selectedLocation.type === 'branch' && (
            <button style={{ width: '100%', backgroundColor: '#008485', borderRadius: '3px', padding: '5px', color: 'white' }} onClick={showModal}>
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
