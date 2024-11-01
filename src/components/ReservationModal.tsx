import React, { useState } from 'react';
import { Modal, Calendar, Col, Radio, Row, Select, Button, Typography } from 'antd';
import Lottie from 'react-lottie';
import checkLottie from '../assets/lottie/check.json';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import dayLocaleData from 'dayjs/plugin/localeData';

import 'dayjs/locale/zh-cn';

dayjs.extend(dayLocaleData);

interface ReservationModalProps {
  isOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onOk, onCancel }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleOk = () => {
    setShowAnimation(true);
    setTimeout(() => {
      onOk();
      setShowAnimation(false);
    }, 1500);
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

  const times = {
    am: ["10:00", "10:30", "11:00", "11:30"],
    pm: ["12:00", "12:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30", "5:00", "5:30", "6:00", "6:30", "7:00", "7:30", "8:00", "8:30"],
  };

  return (
    <Modal
      title="예약하기"
      open={isOpen}
      onOk={handleOk}
      onCancel={onCancel}
      bodyStyle={{ maxHeight: '400px', overflowY: 'auto' }}
      className="scrollbar-thumb-rounded"
    >
      {showAnimation ? (
        <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Lottie options={lottieOptions} height={200} width={200} />
          <p style={{fontSize:'15px'}}>예약이 완료되었습니다.</p>
        </div>
      ) : (
        <>
          <div>
            <p style={{fontSize:'20px', fontWeight:'700', marginTop:'3px'}}>날짜와 시간을 선택해주세요.</p>
            <div style={{marginTop:'10px'}}>
            <Calendar
              fullscreen={false}
              headerRender={({ value, type, onChange, onTypeChange }) => {
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
                    <Select.Option key={i} value={i} className="month-item">
                      {months[i]}
                    </Select.Option>
                  );
                }

                const year = value.year();
                const month = value.month();
                const options = [];
                for (let i = year - 10; i < year + 10; i += 1) {
                  options.push(
                    <Select.Option key={i} value={i} className="year-item">
                      {i}
                    </Select.Option>
                  );
                }
                return (
                  <div style={{ padding: 8 }}>
                    <Row gutter={8}>
                      <Col>
                        <Radio.Group
                          size="small"
                          onChange={(e) => onTypeChange(e.target.value)}
                          value={type}
                        >
                          <Radio.Button value="month">Month</Radio.Button>
                          <Radio.Button value="year">Year</Radio.Button>
                        </Radio.Group>
                      </Col>
                      <Col>
                        <Select
                          size="small"
                          popupMatchSelectWidth={false}
                          className="my-year-select"
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
                          size="small"
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
            />
          </div>
        {/* </> */}
            
          </div>
          <div style={{ marginTop: '20px' }}>
            <Typography.Title level={5}>오전</Typography.Title>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
              {times.am.map((time) => (
                <Button
                  key={time}
                  type={selectedTime === time ? 'primary' : 'default'}
                  onClick={() => handleTimeClick(time)}
                >
                  {time}
                </Button>
              ))}
            </div>

            <Typography.Title level={5}>오후</Typography.Title>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {times.pm.map((time) => (
                <Button
                  key={time}
                  type={selectedTime === time ? 'primary' : 'default'}
                  onClick={() => handleTimeClick(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

export default ReservationModal;
