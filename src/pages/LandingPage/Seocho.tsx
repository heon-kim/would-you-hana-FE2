import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Carousel } from 'antd';
import hanaFamilyTogether from '../../assets/img/HanaFamilyTogether.png';
import iconUser from '../../assets/img/icon_user.png';
import labelDistrict from '../../assets/img/label_district.png';
import logoSeocho from '../../assets/img/logo_seocho.png';
import labelRegulation from '../../assets/img/label_regulation.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../hoc/store';
import SearchInput from '../../components/SearchInput';

import '../../App.css';

// 구 플래그 컴포넌트
const GuBadge: React.FC = () => {
  return (
    <div style={guContainerStyle}>
      <img src={logoSeocho} style={{ padding: '15px' }}></img>
    </div>
  );
};

// 규제 플래그 컴포넌트
const RegulationBadge: React.FC = () => {
  return (
    <div style={regulationContainerStyle}>
      <span style={flagRegulationTextStyle}>부동산 <br />규제지역</span>
    </div>
  );
};

const guContainerStyle = {
  backgroundImage: `url(${labelDistrict})`,
  backgroundSize: 'cover',
  color: '#fff',
  fontWeight: 'bold',
  padding: '0px 0', // Removed top padding by setting it to 0
  textAlign: 'center' as const,
  fontSize: '20px',
  width: '120px',
  height: '100px',
  margin: '0 auto',
  display: 'inline-block',
  lineHeight: '4',
};


const regulationContainerStyle = {
  backgroundImage: `url(${labelRegulation})`,
  backgroundSize: 'cover',
  color: '#fff',
  fontWeight: 'bold',
  padding: '7px 0', // Removed top padding by setting it to 0
  textAlign: 'center' as const,
  fontSize: '20px',
  width: '120px',
  height: '100px',
  margin: '0 auto',
  display: 'inline-block',
  lineHeight: '4',
};


const flagRegulationTextStyle = {
  display: 'block',
  lineHeight: '1.5'
}

// Function to handle search
const onSearch = (value: string) => {
  console.log(value);
  // Add logic to handle the search input, e.g., navigate to a results page
};

const CardContent = ({ type, date, likes, views, content }: { type: string, date: string, likes: string, views: string, content: string }) => (
  <div style={{ textAlign: 'left', padding: '10px', marginTop: '10px' }}>
    <div style={{ marginTop: '10px', justifyContent: 'space-between' }}>
      <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#FF6F61' }}>{type}</span>
      <span style={{ fontSize: '14px', color: '#888888', marginLeft: '20px' }}> {date}</span>
    </div>
    <div style={{ fontSize: '22px', color: '#000', marginTop: '10px' }}>{content}</div>
    <div style={{ marginTop: '10px', justifyContent: 'space-between', textAlign: 'end' }}>
      <span style={{ fontSize: '14px', color: '#888888', marginRight: '20px' }}>좋아요 {likes}</span>
      <span style={{ fontSize: '14px', color: '#888888' }}>👀조회수 {views}</span>
    </div>
    <hr style={{ marginTop: '20px', color: 'black' }} />
  </div>
);

const Seocho: React.FC = () => {
  //const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const userEmail = useSelector((state: RootState) => state.auth.userEmail);

  const [carouselIndex, setCarouselIndex] = useState(0);
  const keyword = ["자산관리", "외국인금융", "경기침체", "주택담보대출"];

  const handleCarouselChange = (current: number) => {
    setCarouselIndex(current);
  };


  useEffect(() => {
    console.log('User Role:', userRole);
    console.log('User Email:', userEmail);
    console.log('Is Authenticated:', isAuthenticated);
  }, [userRole, userEmail, isAuthenticated]);


  return (
    <div style={{ width: '100%', padding: '20 20' }}>
      <div style={{ textAlign: 'center' }}>
        <Row
          gutter={[16, 16]}
          style={{ backgroundColor: '#00848515', height: '600px' }}
        >
          <Col span={12}>
            <div style={{ marginLeft: '100px', display: 'flex', justifyContent: 'start' }}>
              <div style={{ display: 'flex', gap: '30px', width: '300px' }}>
                <GuBadge />
                <RegulationBadge />
              </div>
            </div>


            <div style={{ marginLeft: '150px', marginTop: '35px' }}>
              <img
                src={hanaFamilyTogether}
                alt='hanaFamilyTogether'
                width={550}
              />
            </div>
          </Col>

          <Col span={12} style={{alignContent:'center',  width:'100%', alignItems:'end'}}>
            <style>
              {`
                                .custom-carousel .carousel-item {
                                    transition: all 0.3s ease;
                                    text-align: center;
                                    font-size: 50px;
                                    opacity: 0.5;
                                    transform: scale(0.8);
                                    cursor: pointer;
                                    height: 100px;
                                    line-height: 100px;
                                    color: #008485;
                                }

                                .custom-carousel .carousel-item.focused {
                                    font-size: 50px;
                                    font-weight: 800;
                                    opacity: 1;
                                    transform: scale(1);
                                }

                                .custom-carousel {
                                    max-height: 300px;
                                    overflow: hidden;
                                }
                                `}
            </style>
            <strong
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                marginTop: '0px',
                marginRight:'150px',
                textAlign: 'right',
                alignItems: 'end',
              }}
            >
              <span style={{ fontSize: '35px', fontWeight:800 }}>
                {' '}
                지금 <span style={{ fontSize: '45px', fontWeight:800 }}>서초구</span> 주민들은
              </span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Carousel
                  afterChange={handleCarouselChange}
                  vertical
                  dots={false}
                  className='custom-carousel'
                  autoplay={true}
                  autoplaySpeed={2800}
                  style={{ width: '300px' }}
                >
                  {keyword.map((keyword, index) => (
                    <span
                      key={index}
                      className={`carousel-item ${
                        index === carouselIndex ? 'focused' : ''
                      }`}
                    >
                      {keyword}
                    </span>
                  ))}
                </Carousel>

                <p style={{ fontSize: '35px', alignContent: 'center', fontWeight:800 }}>
                  에 관심이 있어요.
                </p>
              </div>
            </strong>
            <div style={{marginRight:'150px',}}>
            <SearchInput onSearch={onSearch} />
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ backgroundColor: '#ffffff', paddingLeft: "30px", paddingRight: "30px" }}>
          <Col span={24} style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>

            </h2>
          </Col>

          <Col xs={24} sm={8}>
            <Card

              title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>🔥 HOT 금융 게시물</span>}
              style={{ textAlign: 'center', fontSize: '20px' }}
            //onClick={() => navigate('/feature-a')}
            >
              <CardContent
                type="대출"
                date="2024.10.30 10:31"
                likes={'2.5K개'}
                views={'21.2K회'}
                content="서초구에서 전세자금 대출 상담 잘해주는 곳"
              />
              <CardContent
                type="소비"
                date="2024.10.29 09:15"
                likes={'1.0K개'}
                views={'12.1K회'}
                content="서초구 맛집 리스트 공유해요"
              />
              <CardContent
                type="주식"
                date="2024.10.30 10:31"
                likes={'2.5K개'}
                views={'21.2K회'}
                content="서초구 사람들 주식 어떤 종목 투자해요?"
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card
              title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>✒️ 방금 답변이 작성된 Q&A</span>}
              style={{ textAlign: 'center' }}
            //onClick={() => navigate('/feature-b')}
            >
              <CardContent
                type="대출"
                date="2024.10.31 10:31"
                likes={'122개'}
                views={'1.0K회'}
                content="사업자 대출 조건이 궁금합니다"
              />

              <CardContent
                type="외환"
                date="2024.11.03 10:31"
                likes={'182개'}
                views={'2.0K회'}
                content="외화 통장 개설 관련 문의"
              />
            </Card>
          </Col>

          <Col xs={24} sm={8}>
            <Card
              title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>🏆 오늘의 열혈 답변가</span>}
              style={{ textAlign: 'center' }}
            //onClick={() => navigate('/feature-c')}
            >
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffC0CB60', padding: '20px', borderRadius: '10px', marginBottom: '10px', marginLeft: '0px', textAlign: 'left' }}>
                <div style={{ fontSize: '36px', marginRight: '15px' }}>🥇</div>
                <img src={iconUser} alt="User Icon" style={{ width: '100px', height: '100px', marginRight: '15px', marginLeft: '0px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold' }}>보섭살김하나</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>LV24</div>
                  <div style={{ fontSize: '18px' }}>활동🥁: 46</div>
                  <div style={{ fontSize: '18px' }}>좋아요👍🏻: 89</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f6FE8060', padding: '20px', borderRadius: '10px', marginBottom: '10px', marginLeft: '0px', width: '100%', textAlign: 'left' }}>
                <span style={{ fontSize: '36px', marginRight: '20px', lineHeight: '1' }}>🥈</span>
                <div style={{ display: 'grid', gridTemplateColumns: '150px auto auto auto', alignItems: 'center', width: '100%', gap: '10px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 'bold' }}>별돌이도내꺼야</span>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>LV18</span>
                  <span style={{ fontSize: '18px' }}>활동🥁: 46</span>
                  <span style={{ fontSize: '18px' }}>좋아요👍🏻: 89</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ADC8E650', padding: '20px', borderRadius: '10px', marginBottom: '10px', marginLeft: '0px', width: '100%', textAlign: 'left' }}>
                <span style={{ fontSize: '36px', marginRight: '20px', lineHeight: '1' }}>🥉</span>
                <div style={{ display: 'grid', gridTemplateColumns: '150px auto auto auto', alignItems: 'center', width: '100%', gap: '10px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 'bold' }}>나폴리맛피아</span>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>LV42</span>
                  <span style={{ fontSize: '18px' }}>활동🥁: 16</span>
                  <span style={{ fontSize: '18px' }}>좋아요👍🏻: 24</span>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Seocho;
