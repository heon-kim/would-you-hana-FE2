import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Tooltip } from 'antd';
import { HomeOutlined, CalendarOutlined } from '@ant-design/icons';
import userIcon from '../../../../assets/img/icon_user.png';
import { relativeTime } from '../../../../utils/stringFormat';
import { AnswerInterface } from '../../../../types/post';
import { findBanker } from '../../../../utils/userStorage';

interface AnswerProps {
  answer: AnswerInterface;
}

const Answer: React.FC<AnswerProps> = ({ answer }) => {
  const navigate = useNavigate();
  const banker = findBanker(answer.authorEmail || '');

  const handleProfileBtn = () => {
    navigate('/bankerProfile');
  };

  const handleReserveBtn = () => {
    navigate('/findbank');
  };

  return (
    <>
      <div className='answer flex flex-col border rounded shadow-md'>
        <h1 className='p-5 font-bold bg-pointColor'>
          하나은행 {banker?.branchName} 지점 {banker?.name || ''} 은행원의 답변
        </h1>
        <div className='p-5 flex flex-col gap-5'>
          <div className='comment__header flex justify-between font-light border-b pb-5'>
            <div className='flex gap-3'>
              <img src={userIcon} alt='user icon' className='w-12 h-12' />
              <div>
                <div className='flex gap-3'>
                  <span>{banker?.name} 은행원</span>
                  <div className='bg-gray-300 rounded-full px-3 text-sm self-center'>
                    🎖️ 행원
                  </div>
                </div>
                <span className='text-gray-400 text-xs'>
                  #금융인증서 #주택청약
                </span>
              </div>
            </div>
            <div className='flex gap-5'>
              <Tooltip title='프로필 보기' color='white'>
                <Button icon={<HomeOutlined />} onClick={handleProfileBtn} />
              </Tooltip>
              <Tooltip title='상담 예약하기' color='white'>
                <Button
                  icon={<CalendarOutlined />}
                  onClick={handleReserveBtn}
                />
              </Tooltip>
            </div>
          </div>
          <p className='comment__body font-light'>{answer.content}</p>
          <div className='comment__footer font-light flex flex-col gap-5'>
            <p className='text-xs text-gray-400'>
              {relativeTime(+new Date(answer.createdAt))}
            </p>
            <div className='flex justify-between'>
              <Button>👍 도움돼요</Button>
              <Button>🔗 공유</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Answer;