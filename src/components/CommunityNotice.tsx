import React from 'react';
import IconAnnouncement from '../assets/img/icon_notice.png';
import IconWouldYouHana from '../assets/img/would_you_hana.png';

const CommunityNotice: React.FC = () => {
  return (
    <div className='flex'>
      
        <div style={{ width: '100%' }}>
        <a href='https://soco.seoul.go.kr/youth/bbs/BMSR00015/list.do?menuNo=400008'
      target="_blank"
      rel="noopener noreferrer">
          <div
            style={{
              backgroundColor: '#E0FFD1',
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              padding: '15px',
            }}
          >
            <div
              style={{
                width: '60%',
                height: '150px',
                alignContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'center',
                gap: '10px',
                marginLeft: '10px',
              }}
            >
              <p style={{ color: '#4F4F4F', fontWeight: 'bold' }}>
                우리 동네 최근 소식!
              </p>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
                <span className='text-mainColor'>광진구</span> 행복주택 분양공고
                OPEN
              </h1>
              <p style={{ color: '#4F4F4F', fontWeight: 'bold' }}>
                보러가기 &gt;
              </p>
            </div>
            <div
              style={{
                width: '30%',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
              }}
            >
              <img src={IconAnnouncement} style={{ width: '170px' }} />
            </div>
            <div
              style={{
                width: '20%',
                alignItems: 'end',
                justifyContent: 'end',
                justifyItems: 'center',
                padding: '15px',
                display: 'flex',
              }}
            >
              <img src={IconWouldYouHana} style={{ width: '120px' }} />
            </div>
          </div>
          </a>
        </div>
      
    </div>
  );
};

export default CommunityNotice;
