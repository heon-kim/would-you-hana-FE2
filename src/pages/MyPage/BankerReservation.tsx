import React, { useState } from 'react';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import iconClock from '../../assets/img/icon_clock.svg';
import iconHome from '../../assets/img/icon_home.svg';
import iconHana from '../../assets/img/icon_hana.png';
import iconPin from '../../assets/img/icon_pin.svg';
import iconPhone from '../../assets/img/icon_phone.svg';
import hwayangImg from '../../assets/img/bank/hwayang.jpg';
import seongsuImg from '../../assets/img/bank/seongsu.png';
import seouluuuuuupImg from '../../assets/img/bank/seoulsuuuuuup.jpg';

const reservations = [
  {
    id: 1,
    date: '2024-12-25',
    time: '10:00 AM',
    branch: '성수점',
    userName: '김고객',
    banker: '김하나 대리',
  },
  {
    id: 2,
    date: '2024-12-26',
    time: '2:00 PM',
    branch: '성수점',
    userName: '김해원',
    banker: '고은행 과장',
  },
  {
    id: 3,
    date: '2024-12-27',
    time: '4:00 PM',
    branch: '성수점',
    userName: '정연채',
    banker: '홍창기 대리',
  },
];

const BankerReservation: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [filteredReservations, setFilteredReservations] = useState(reservations);

  const getListData = (value: Dayjs) => {
    const selectedDateString = value.format('YYYY-MM-DD');
    return reservations.filter((reservation) =>
      reservation.date === selectedDateString
    );
  };

  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
    const listData = getListData(date);
    setFilteredReservations(listData);
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id}>
            <Badge status="success" text={`예약: ${item.time}`} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  return (
    <div className="flex">
      {/* 캘린더 */}
      <div style={{ width: '50%', height: '60%', padding: '20px' }}>
        <Calendar
          onSelect={handleDateSelect}
          cellRender={cellRender}
          style={{ height: '100%' }}
        />
      </div>

      {/* 예약 내역 */}
      <div
        style={{
          fontSize: '20px',
          fontWeight: 'bold',
          marginBottom: '20px',
          width: '50%',
          marginLeft: '30px',
        }}
      >
        <div>예약 내역</div>
        <div className="px-10">
          <div
            style={{
              marginTop: '20px',
              maxHeight: '90vh',
              overflowY: 'auto',
              justifyItems: 'center',
            }}
          >
            {filteredReservations.map((reservation) => (
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
                <div className="flex ml-4">
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    className="mt-2"
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
                  <div className="flex flex-col ml-4 mt-1 text-[#555558] gap-2">
                    <div className="text-black">
                      <strong>{reservation.userName}</strong>
                    </div>
                    <div
                      className="flex gap-2 align-center text-center"
                      style={{ fontSize: '16px' }}
                    >
                      <img src={iconClock} width={'17px'} />
                      {reservation.time} 예약
                      <p
                        className="text-gray-400 font-normal flex justify-center items-center"
                        style={{ fontSize: '14px' }}
                      >
                        {' '}
                        · 1번째 방문
                      </p>
                    </div>
                    <div className="flex gap-2" style={{ fontSize: '16px' }}>
                      <img src={iconHome} width={'17px'} />
                      {reservation.banker}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankerReservation;
