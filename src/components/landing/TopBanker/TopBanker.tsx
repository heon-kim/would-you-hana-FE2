import React from 'react';
import { Card } from 'antd';
import iconUser from '../../../assets/img/icon_user.png';

interface BankerInfo {
  rank: '🥇' | '🥈' | '🥉';
  name: string;
  level: string;
  activities: string;
  likes: string;
  bgColor: string;
  showFullProfile?: boolean;
}

const TopBanker: React.FC<{ bankers: BankerInfo[] }> = ({ bankers }) => {
  return (
    <Card
      title={<span className="font-bold">🏆 오늘의 열혈 답변가</span>}
      className="text-center"
    >
      {bankers.map((banker, index) => (
        <div
          key={index}
          className={`flex items-center ${banker.bgColor} rounded-lg p-5 mb-3 text-left`}
        >
          <span className="text-4xl mr-4 leading-none">{banker.rank}</span>
          {banker.showFullProfile && (
            <img
              src={iconUser}
              alt="User Icon"
              className="w-[100px] h-[100px] mr-4"
            />
          )}
          <div className={`${banker.showFullProfile ? 'flex flex-col gap-2' : 'grid grid-cols-4'} w-full`}>
            <span className="font-bold">{banker.name}</span>
            <span className="font-bold">{banker.level}</span>
            <span className="">활동🥁: {banker.activities}</span>
            <span className="">좋아요👍🏻: {banker.likes}</span>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default TopBanker; 