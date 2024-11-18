import React from 'react';
import IconUser from '../assets/img/img_banker1_square.png';
import IconUser2 from '../assets/img/img_banker2_square.png';
import IconUser3 from '../assets/img/img_banker3_square.png';
import IconUser4 from '../assets/img/img_banker4_square.png';
import { useNavigate } from 'react-router-dom';

const bankers = [
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
    branck: '신자양점',
    position: '차장',
    description:
      '주택 청약을 도와드리는 홍창기 차장입니다. 많이 알고 있다고 생각하지만 실제로 보면 헷갈리는 주택청약에 대해서 알려드립니다.',
    imageUrl: IconUser2,
  },
  {
    id: 3,
    name: '박해민',
    branck: '신자양점',
    position: '대리',
    description:
      '내 돈을 관리한다는 마음으로 관리해 드리는 박해민 대리입니다. 지금 고객님께 필요한 적금 방법 꼼꼼하게 알려드려요!',
    imageUrl: IconUser3,
  },
  {
    id: 4,
    name: '강백호',
    branck: '신자양점',
    position: '주임',
    description:
      '부동산 자산 관리 전문가로서 고객님의 재산을 안전하게 관리해 드립니다.',
    imageUrl: IconUser4,
  },
];

const BankerList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        borderWidth:'1.5px',
        borderColor:'#CFCFCF40',
        height: 'auto',
        alignContent: 'center',
        padding: '20px',
        borderRadius: '5px',
      }}
    >
      <ul>
        <p style={{ fontSize: '18px' }}>저희에게 무엇이든 물어보세요!</p>
        {bankers.map((banker) => (
          <li>
            <div className='flex flex-col' style={{ marginTop: '20px' }} onClick={() => navigate('/bankerProfile')}>
              <div className='flex align-center justify-center gap-3'>
                <div className='w-1/4'>
                  <img
                    src={banker.imageUrl}
                    style={{
                      borderRadius: '50%',
                      width: '50px',
                      height: '50px',
                    }}
                  />
                </div>
                <div className='w-3/4'>
                  <p style={{ fontWeight: 400 }}>
                    {banker.name}&nbsp;{banker.position}
                  </p>
                  <p style={{ fontWeight: 200, color: '#7E8082', fontSize:'15px' }}>
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
