import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'antd';
import notebookUser from '../../assets/img/notebook_byulsongi.png';
import homeFindBank from '../../assets/img/home_findBank.png';
import homeQNA from '../../assets/img/home_qna.png';
import homeCommunity from '../../assets/img/home_community.png';

import { useSelector } from 'react-redux';
import { RootState } from '../../hoc/store';

import '../../App.css';

import SearchInput from '../../components/SearchInput';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const userEmail = useSelector((state: RootState) => state.auth.userEmail);
  const userLocation = useSelector((state: RootState) => state.auth.userLocation);

  const [showFirstRow, setShowFirstRow] = useState(false);
  const [showSecondRow, setShowSecondRow] = useState(false);
  const [showThirdRow, setShowThirdRow] = useState(false);
  const [showFourthRow, setShowFourthRow] = useState(false);

  const firstRowRef = useRef<HTMLDivElement | null>(null);
  const secondRowRef = useRef<HTMLDivElement | null>(null);
  const thirdRowRef = useRef<HTMLDivElement | null>(null);
  const fourthRowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === firstRowRef.current) {
              setShowFirstRow(true);
              observer.unobserve(firstRowRef.current);
            } else if (entry.target === secondRowRef.current) {
              setShowSecondRow(true);
              observer.unobserve(secondRowRef.current);
            } else if (entry.target === thirdRowRef.current) {
              setShowThirdRow(true);
              observer.unobserve(thirdRowRef.current);
            } else if (entry.target === fourthRowRef.current) {
              setShowFourthRow(true);
              observer.unobserve(fourthRowRef.current);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    if (firstRowRef.current) observer.observe(firstRowRef.current);
    if (secondRowRef.current) observer.observe(secondRowRef.current);
    if (thirdRowRef.current) observer.observe(thirdRowRef.current);
    if (fourthRowRef.current) observer.observe(fourthRowRef.current);

    return () => observer.disconnect();
  }, []);


  // useEffect를 사용하여 상태가 업데이트 될 때마다 실행
  useEffect(() => {
    console.log('User Role:', userRole);
    console.log('User Email:', userEmail);
    console.log('Is Authenticated:', isAuthenticated);
    console.log('location : ', userLocation);

    // 여기에서 필요에 따라 추가 로직을 구현할 수 있습니다.
  }, [userRole, userEmail, isAuthenticated]); // 상태가 변경될 때마다 실행

  // Function to handle search
  const onSearch = (value: string) => {
    console.log(value);
    // Add logic to handle the search input, e.g., navigate to a results page
  };

  return (
    <div style={{ width: '100%', padding: '20 20' }}>
      <div style={{ textAlign: 'center' }}>
        <Row
          ref={firstRowRef}
          gutter={[16, 16]}
          style={{ backgroundColor: '#DDFCD2', height: '600px' }}
        >
          {/* Carousel Column */}
          <Col span={12} style={{
            marginTop: '100px',
            opacity: showFirstRow ? 1 : 0,
            transform: showFirstRow ? 'translateX(0)' : 'translateX(-50px)',
            transition: 'all 1s ease-in-out'
          }}>
            <img
              src={notebookUser}
              alt="notebookUser"
              width={470}
              style={{ marginLeft: '100px', marginTop: '15px' }}
            ></img>
          </Col>

          {/* Search Input Column */}
          <Col span={12} style={{
            alignContent: 'center',
            marginLeft: '0px',
            opacity: showFirstRow ? 1 : 0,
            transform: showFirstRow ? 'translateX(0)' : 'translateX(50px)',
            transition: 'all 1s ease-in-out'
          }}>
            <h1
              style={{
                color: 'black',
                fontSize: '40px',
                lineHeight: '1.2',
                textAlign: 'left',
              }}
            >
              <strong>
                궁금한 금융 질문을
                <br />
                <span style={{ color: 'green' }}> 내 주변의 하나 가족</span>
                으로부터
                <br /> 답변 받아가세요!
              </strong>
            </h1>

            {/* SearchInput 컴포넌트 사용 */}
            <SearchInput onSearch={onSearch} />

          </Col>
        </Row>

        {/* q&a 서비스 */}
        <Row
          ref={secondRowRef}
          gutter={[16, 16]}
          style={{ backgroundColor: '#84D5B2', height: '500px', marginTop: '30px' }}
        >

          <Col span={12} style={{
            marginTop: '100px',
            opacity: showSecondRow ? 1 : 0,
            transform: showSecondRow ? 'translateX(0)' : 'translateX(-50px)',
            transition: 'all 1s ease-in-out',
            transitionDelay: '0.3s'
          }}>
            <h1
              style={{
                color: 'black',
                fontSize: '40px',
                lineHeight: '1.2',
                textAlign: 'left',
                marginLeft: '10%'
              }}
            >
              <strong>
                우리 지역 행원에게
                <br />
                직접 답변 받는 Q&A
              </strong>
            </h1>

            <div style={{ fontWeight: 'lighter', fontSize: '20px', marginTop: '30px', textAlign: 'left', marginLeft: '10%' }}>
              언제든지, 어디서나<br />
              내 주변 하나 금융 그룹 전문가로부터<br />
              금융 관련 지식을 얻어가세요!
            </div>

            <div style={{ marginTop: '70px', fontWeight: 'lighter', textAlign: 'left', marginLeft: '10%', cursor: 'pointer' }}>
              ▶ 지역 Q&A 서비스 바로가기
            </div>
          </Col>

          {/* Image Column - Right Side */}
          <Col span={12} style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            opacity: showSecondRow ? 1 : 0,
            transform: showSecondRow ? 'translateX(0)' : 'translateX(50px)',
            transition: 'all 1s ease-in-out'
          }}>
            <img
              src={homeQNA}
              alt="homeQNA"
              width={470}
              style={{ marginRight: '10%', marginTop: '15px' }}
            ></img>
          </Col>
        </Row>

        {/* 커뮤니티 서비스 */}
        <Row
          ref={thirdRowRef}
          gutter={[16, 16]}
          style={{ backgroundColor: '#B7E4FF', height: '500px', marginTop: '30px' }}
        >
          {/* Carousel Column */}
          <Col span={12} style={{
            marginTop: '20px',
            opacity: showThirdRow ? 1 : 0,
            transform: showThirdRow ? 'translateX(0)' : 'translateX(-50px)',
            transition: 'all 1s ease-in-out'
          }}>
            <img
              src={homeCommunity}
              alt="homeCommunity"
              width={400}
              style={{ marginLeft: '10%', marginTop: '15px' }}
            ></img>
          </Col>

          {/* Search Input Column */}
          <Col span={12} style={{
            alignContent: 'center',
            marginRight: '0px',
            opacity: showThirdRow ? 1 : 0,
            transform: showThirdRow ? 'translateX(0)' : 'translateX(50px)',
            transition: 'all 1s ease-in-out'
          }}>
            <h1
              style={{
                color: 'black',
                fontSize: '40px',
                lineHeight: '1.2',
                textAlign: 'right',
                marginRight: '10%'
              }}
            >
              <strong>
                우리 지역 금융 커뮤니티
              </strong>
            </h1>

            <div style={{ fontWeight: 'lighter', fontSize: '20px', marginTop: '30px', textAlign: 'right', marginRight: '10%' }}>
              우리 동네 사람들과<br />
              자유롭게 금융에 관한 다양한 주제로<br />
              함께 소통할 수 있어요!
            </div>

            <div style={{ marginTop: '70px', fontWeight: 'lighter', textAlign: 'right', marginRight: '10%', cursor: 'pointer' }}>
              ▶ 지역 커뮤니티 서비스 바로가기
            </div>
          </Col>
        </Row>

        {/* 영업점 찾기 서비스 */}
        <Row
          ref={fourthRowRef}
          gutter={[16, 16]}
          style={{ backgroundColor: '#FFD39A', height: '500px', marginTop: '30px' }}
        >
          {/* Text Column - Left Side */}
          <Col span={12} style={{
            marginTop: '100px',
            opacity: showFourthRow ? 1 : 0,
            transform: showFourthRow ? 'translateX(0)' : 'translateX(-50px)',
            transition: 'all 1s ease-in-out',
            transitionDelay: '0.3s'
          }}>
            <h1
              style={{
                color: 'black',
                fontSize: '40px',
                lineHeight: '1.2',
                textAlign: 'left',
                marginLeft: '10%'
              }}
            >
              <strong>
                우리 동네 영업점 찾기
              </strong>
            </h1>

            <div style={{ fontWeight: 'lighter', fontSize: '20px', marginTop: '30px', textAlign: 'left', marginLeft: '10%' }}>
              가까운 영업점을 빠르게 확인하고,<br />
              쉽고 간편하게 행원과의 상담을 예약할 수 있어요!<br />
              금융 관련 지식을 얻어가세요!
            </div>

            <div style={{ marginTop: '70px', fontWeight: 'lighter', textAlign: 'left', marginLeft: '10%', cursor: 'pointer' }}>
              ▶ 영업점 찾기 서비스 바로가기
            </div>
          </Col>

          {/* Image Column - Right Side */}
          <Col span={12} style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            opacity: showFourthRow ? 1 : 0,
            transform: showFourthRow ? 'translateX(0)' : 'translateX(50px)',
            transition: 'all 1s ease-in-out'

          }}>
            <img
              src={homeFindBank}
              alt="homeFindBank"
              width={470}
              style={{ marginRight: '10%', marginTop: '15px' }}
            ></img>
          </Col>
        </Row>


      </div>
    </div>
  );
};

export default Home;
