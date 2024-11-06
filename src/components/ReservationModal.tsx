import React, { useState, useEffect } from 'react';
import {
  Modal,
  Calendar,
  Col,
  Radio,
  Row,
  Select,
  Button,
  Typography,
  message
} from 'antd';
import Lottie from 'react-lottie';
import checkLottie from '../assets/lottie/check.json';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import dayLocaleData from 'dayjs/plugin/localeData';
import moment from 'moment';

import 'dayjs/locale/zh-cn';
import { current } from '@reduxjs/toolkit';

dayjs.extend(dayLocaleData);

interface ReservationModalProps {
  isOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onOk,
  onCancel,
}) => {
  const currentDateTime = dayjs();

  const [showAnimation, setShowAnimation] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // 모달이 열릴 때 selectedDate와 selectedTime을 초기화
  useEffect(() => {
    if (isOpen) {
      setSelectedDate(currentDateTime.format('YYYY-MM-DD'));
      setSelectedTime(null);
    }
  }, [isOpen]);
  
  const handleOk = () => {
    if(!selectedTime) {
      message.warning('예약 시간을 선택해 주세요.');
    }
    else {
      setShowAnimation(true);
      setTimeout(() => {
        onOk();
        setShowAnimation(false);
      }, 1500);
    }
  };

  const lottieOptions = {
    loop: false,
    autoplay: true,
    animationData: checkLottie,
  };

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const onDateSelect = (date) => {
    // 선택된 날짜를 'YYYY-MM-DD' 형식으로 저장
    setSelectedDate(date.format('YYYY-MM-DD'));
  };

  const times = {
    am: ['09:30', '10:00', '10:30', '11:00', '11:30'],
    pm: [
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',    
    ],
  };

  return (
    <Modal
      title='예약하기'
      open={isOpen}
      onOk={handleOk}
      onCancel={onCancel}
      styles={{ body: { maxHeight: '400px', overflowY: 'auto' } }}
      className='scrollbar-thumb-rounded'
    >
      {showAnimation ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Lottie options={lottieOptions} height={200} width={200} />
          <p style={{ fontSize: '15px' }}>예약이 완료되었습니다.</p>
        </div>
      ) : (
        <>
          <div>
            <p
              style={{ fontSize: '20px', fontWeight: '700', marginTop: '3px' }}
            >
              날짜와 시간을 선택해주세요.
            </p>
            <div style={{ marginTop: '10px' }}>
              <Calendar
                fullscreen={false}
                onSelect={onDateSelect}
                //value={selectedDate ? dayjs(selectedDate) : null}
                headerRender={({ value, type, onChange, onTypeChange}) => {
                  const start = 0;
                  const end = 12;
                  const monthOptions = [];

                  let current = value.clone();
                  const localeData = value.localeData();
                  const months = [];
                  for (let i = 0; i < 12; i++) {
                    current = current.month(i);
                    months.push(localeData.monthsShort(current));
                  }

                  for (let i = start; i < end; i++) {
                    monthOptions.push(
                      <Select.Option key={i} value={i} className='month-item'>
                        {months[i]}
                      </Select.Option>
                    );
                  }

                  const year = value.year();
                  const month = value.month();
                  const options = [];
                  for (let i = year-5; i < year + 5; i += 1) {
                    options.push(
                      <Select.Option key={i} value={i} className='year-item'>
                        {i}
                      </Select.Option>
                    );
                  }
                  return (
                    <div style={{ padding: 8 }}>
                      <Row gutter={8}>
                        <Col>
                          <Radio.Group
                            size='small'
                            onChange={(e) => onTypeChange(e.target.value)}
                            value={type}
                          >
                            <Radio.Button value='month'>Month</Radio.Button>
                            <Radio.Button value='year'>Year</Radio.Button>
                          </Radio.Group>
                        </Col>
                        <Col>
                          <Select
                            size='small'
                            popupMatchSelectWidth={false}
                            className='my-year-select'
                            value={year}
                            onChange={(newYear) => {
                              const now = value.clone().year(newYear);
                              onChange(now);
                            }}
                          >
                            {options}
                          </Select>
                        </Col>
                        <Col>
                          <Select
                            size='small'
                            popupMatchSelectWidth={false}
                            value={month}
                            onChange={(newMonth) => {
                              const now = value.clone().month(newMonth);
                              onChange(now);
                            }}
                          >
                            {monthOptions}
                          </Select>
                        </Col>
                      </Row>
                    </div>
                  );
                }}
                onPanelChange={onPanelChange}
                disabledDate={(current) => current.isBefore(dayjs().startOf('day'), 'day')}

              />
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <Typography.Title level={5}>오전</Typography.Title>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                marginBottom: '10px',
              }}
            >
              {/* {times.am.map((time) => (
                <Button
                  key={time}
                  type={selectedTime === time ? 'primary' : 'default'}
                  onClick={() => handleTimeClick(time)}
                >
                  {time}
                </Button>
              ))} */}
              {times.am.map((time) => {
                  // time을 dayjs 객체로 변환하여 비교
                  const timeMoment = dayjs(time, 'HH:mm');  // time이 'HH:mm' 형식이라고 가정

                  // time이 현재 시간보다 작은 경우 버튼을 비활성화
                  const isDisabled = timeMoment.isBefore(currentDateTime, 'minute')
                     && selectedDate == currentDateTime.format('YYYY-MM-DD');

                  return (
                    <Button
                      key={time}
                      type={selectedTime === time ? 'primary' : 'default'}
                      onClick={() => handleTimeClick(time)}
                      disabled={isDisabled}  // 현재 시간보다 작은 경우 버튼 비활성화
                    >
                      {time}
                    </Button>
                  );
                })}
            </div>

            <Typography.Title level={5}>오후</Typography.Title>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {times.pm.map((time) => {
                  // time을 dayjs 객체로 변환하여 비교
                  const timeMoment = dayjs(time, 'HH:mm');  // time이 'HH:mm' 형식이라고 가정

                  // time이 현재 시간보다 작은 경우 버튼을 비활성화
                  const isDisabled = timeMoment.isBefore(currentDateTime, 'minute')
                     && selectedDate == currentDateTime.format('YYYY-MM-DD');

                  return (
                    <Button
                      key={time}
                      type={selectedTime === time ? 'primary' : 'default'}
                      onClick={() => handleTimeClick(time)}
                      disabled={isDisabled}  // 현재 시간보다 작은 경우 버튼 비활성화
                    >
                      {time}
                    </Button>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

export default ReservationModal;
