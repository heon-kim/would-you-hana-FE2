import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconUser from '../../../assets/img/img_banker1_square.png';
import IconUser2 from '../../../assets/img/img_banker2_square.png';
import IconUser3 from '../../../assets/img/img_banker3_square.png';
import IconUser4 from '../../../assets/img/img_banker4_square.png';

const BANKERS = [
  {
    id: 1,
    name: '문보경',
    branch: '신자양점',
    position: '대리',
    description:
      '고객님의 대출을 책임지는 문보경 대리입니다. 광진구 신자양점에서 고객님의 아주 작은 고민까지도 하나만의 대출 솔루션으로 해결해 드리겠습니다.',
    imageUrl: IconUser,
  },
  {
    id: 2,
    name: '홍창기',
    branch: '신자양점',
    position: '차장',
    description:
      '주택 청약을 도와드리는 홍창기 차장입니다. 많이 알고 있다고 생각하지만 실제로 보면 헷갈리는 주택청약에 대해서 알려드립니다.',
    imageUrl: IconUser2,
  },
  {
    id: 3,
    name: '박해민',
    branch: '신자양점',
    position: '대리',
    description:
      '내 돈을 관리한다는 마음으로 관리해 드리는 박해민 대리입니다. 지금 고객님께 필요한 적금 방법 꼼꼼하게 알려드려요!',
    imageUrl: IconUser3,
  },
  {
    id: 4,
    name: '강백호',
    branch: '신자양점',
    position: '주임',
    description:
      '부동산 자산 관리 전문가로서 고객님의 재산을 안전하게 관리해 드립니다.',
    imageUrl: IconUser4,
  },
];

const BankerList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="border border-[#CFCFCF40] rounded p-5">
      <p className="text-lg mb-5">저희에게 무엇이든 물어보세요!</p>
      <ul className="space-y-5">
        {BANKERS.map((banker) => (
          <li key={banker.id}>
            <div 
              className="flex flex-col cursor-pointer hover:bg-gray-50 transition-colors rounded p-2" 
              onClick={() => navigate('/bankerProfile')}
            >
              <div className="flex items-center gap-3">
                <div className="w-1/4">
                  <img
                    src={banker.imageUrl}
                    alt={banker.name}
                    className="w-[50px] h-[50px] rounded-full"
                  />
                </div>
                <div className="w-3/4">
                  <p className="font-normal">
                    {banker.name} {banker.position}
                  </p>
                  <p className="font-normal text-[#7E8082] text-sm">
                    {banker.description.length > 57
                      ? `${banker.description.slice(0, 57)}...`
                      : banker.description}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BankerList; 