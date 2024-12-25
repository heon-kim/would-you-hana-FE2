import React, { useEffect, useState } from 'react';
import iconClock from '../../assets/img/icon_clock.svg';
import iconHome from '../../assets/img/icon_home.svg';
import iconHana from '../../assets/img/icon_hana.png';
import iconPin from '../../assets/img/icon_pin.svg';
import iconPhone from '../../assets/img/icon_phone.svg';
import hwayangImg from '../../assets/img/bank/hwayang.jpg';
import seongsuImg from '../../assets/img/bank/seongsu.png';
import seouluuuuuupImg from '../../assets/img/bank/seoulsuuuuuup.jpg';
import { config } from '../../config/config';

const UserReservation: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  const reservations = [
    {
      id: 1,
      date: '2024-12-25',
      time: '10:00 AM',
      branch: '화양점',
      userName: '김고객',
      banker: '김하나 대리',
    },
    {
      id: 2,
      date: '2024-12-26',
      time: '2:00 PM',
      branch: '성수점',
      userName: '김고객',
      banker: '고은행 과장',
    },
    {
      id: 3,
      date: '2024-12-27',
      time: '4:00 PM',
      branch: '서울숲점',
      userName: '김고객',
      banker: '홍창기 대리',
    },
  ];

  const branchDetails = {
    화양점: {
      image: hwayangImg,
      address: '서울시 광진구 화양동 123-45',
      contact: '02-111-2222',
      status: '영업 중',
      url: 'https://place.map.kakao.com/872699546',
    },
    성수점: {
      image: seongsuImg,
      address: '서울시 성동구 성수동 678-90',
      contact: '02-333-4444',
      status: '영업 중',
      url: 'https://place.map.kakao.com/1841540654',
    },
    서울숲점: {
      image: seouluuuuuupImg,
      address: '서울시 성동구 서울숲길 101-23',
      contact: '02-555-6666',
      status: '영업 중',
      url: 'https://place.map.kakao.com/8123840',
    },
  };

  const handleBranchSelect = (branchName: string) => {
    setSelectedBranch(branchName);
  };

  const handleDetailInfo = (url: string) => {
    window.open(url, '_blank');
  };
  
  return (
    <div className='flex'>
      {/* 예약 내역 */}
      <div
        style={{
          fontSize: '20px',
          fontWeight: 'bold',
          marginBottom: '20px',
          width: '50%',
        }}
      >
        <div>예약 내역</div>
        <div className='px-10'>
          <div
            style={{
              marginTop: '20px',
              maxHeight: '75vh',
              overflowY: 'auto',
              justifyItems: 'center',
            }}
          >
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                style={{
                  border: '1px solid #7E8082',
                  borderRadius: '10px',
                  padding: '15px',
                  marginBottom: '15px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  width: '90%',
                  marginRight: '10px',
                }}
              >
                <div>
                  <p
                    style={{
                      fontWeight: 'bolder',
                      color: '#FC4C4E',
                      marginBottom: '3px',
                      fontSize: '15px',
                    }}
                  >
                    {reservation.date}
                  </p>
                </div>
                <div className='flex ml-4'>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    className='mt-2'
                  >
                    <div
                      style={{
                        backgroundColor: '#E9F2FF',
                        width: '32px',
                        height: '32px',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <img src={iconHana} width={'17px'} />
                    </div>
                    <div
                      style={{
                        borderLeft: '3px solid #D9D9D9',
                        height: '90%',
                        margin: '5px',
                      }}
                    />
                  </div>
                  <div className='flex flex-col ml-4 mt-1 text-[#555558] gap-2'>
                    <div className='text-black'>
                      <strong>{reservation.branch}</strong>
                    </div>
                    <div
                      className='flex gap-2 align-center text-center'
                      style={{ fontSize: '16px' }}
                    >
                      <img src={iconClock} width={'17px'} />
                      {reservation.time} 예약
                      <p
                        className='text-gray-400 font-normal flex justify-center items-center'
                        style={{ fontSize: '14px' }}
                      >
                        {' '}
                        · 1번째 방문
                      </p>
                    </div>
                    <div className='flex gap-2' style={{ fontSize: '16px' }}>
                      <img src={iconHome} width={'17px'} />
                      {reservation.banker}
                    </div>
                    <button
                      style={{
                        borderWidth: '1px',
                        borderColor: '#008485',
                        borderRadius: '50px',
                        color: '#008485',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        marginTop: '10px',
                        width: '100px',
                      }}
                      className='px-4 py-3'
                      onClick={() => handleBranchSelect(reservation.branch)}
                    >
                      지점 정보
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 지점 정보 */}
      <div
        style={{
          fontSize: '20px',
          fontWeight: 'bold',
          marginBottom: '20px',
          width: '50%',
          marginLeft: '30px',
        }}
      >
        {selectedBranch ? (
          <div className='flex flex-col gap-2'>
            <div style={{ marginBottom: '20px' }}>{selectedBranch}</div>
            <img
              src={branchDetails[selectedBranch].image}
              alt={`${selectedBranch} 이미지`}
              style={{
                width: '350px',
                height: '350px',
                borderRadius: '10px',
                marginBottom: '20px',
              }}
            />
            <div className='flex flex-row gap-3 items-center'>
              <img src={iconPin} style={{ width: '25px' }} />
              <p>{branchDetails[selectedBranch].address}</p>
            </div>
            <div className='flex flex-row gap-3 items-center'>
              <img src={iconPhone} style={{ width: '25px' }} />
              <p>{branchDetails[selectedBranch].contact}</p>
            </div>
            <div className='flex flex-row gap-3 items-center'>
              <img src={iconClock} style={{ width: '25px' }} />
              <p>09:00 ~ 16:00</p>
            </div>
            <div className='flex flex-row gap-3 items-center'>
              <img src={iconHome} style={{ width: '25px' }} />
              <p>{branchDetails[selectedBranch].status}</p>
            </div>
            <button
              style={{
                borderWidth: '1px',
                borderColor: '#008485',
                borderRadius: '50px',
                color: '#008485',
                fontWeight: 'bold',
                fontSize: '18px',
                marginTop: '10px',
                width: '350px',
              }}
              className='px-4 py-3'
              onClick={() =>{const url = branchDetails[selectedBranch]?.url;
                if (url) {
                  handleDetailInfo(url);
                } else {
                  console.error('URL is undefined for the selected branch.');
                }}}
            >
              상세보기
            </button>
          </div>
        ) : (
          <div>지점을 선택하세요.</div>
        )}
      </div>
    </div>
  );
};

export default UserReservation;
