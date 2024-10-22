import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Input } from 'antd';
import notebookUser from '../assets/img/notebook_byulsongi.png';
import iconSearch from '../assets/img/icon_search.png';
import '../App.css';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../store'; // Assuming this is your Redux store's RootState type

const { Search } = Input;

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  //   const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  //   const dispatch = useDispatch();

  // Function to handle search
  const onSearch = (value: string) => {
    console.log(value);
    // Add logic to handle the search input, e.g., navigate to a results page
  };

  return (
    <div style={{ width: '100%', padding: '20 20' }}>
      <div style={{ textAlign: 'center' }}>
        <Row
          gutter={[16, 16]}
          style={{ backgroundColor: '#DDFCD2', height: '600px' }}
        >
          {/* Carousel Column */}
          <Col span={12} style={{ marginTop: '100px' }}>
            <h1
              style={{
                color: 'black',
                fontSize: '48px',
                lineHeight: '1.2',
                textAlign: 'left',
                marginLeft: '100px',
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
            <img
              src={notebookUser}
              alt='notebookUser'
              width={320}
              style={{ marginLeft: '100px', marginTop: '15px'}}
            ></img>
          </Col>

          {/* Search Input Column */}
          <Col span={12} style={{ marginTop: '300px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <input
                style={{
                  width: '65%',
                  marginRight: '10px',
                  height: '55px',
                  borderRadius: '6px',
                  padding: '8px',
                  fontFamily: 'Hana2Medium',
                  fontSize: '15px',
                }}
                placeholder='질문을 입력하세요.'
              ></input>
              <button className='bg-[#008485] w-[120px] h-[55px] rounded-lg p-2 text-white text-[15px] hover:bg-[#006f6f]'>
                <div className='flex items-center justify-center font-Hana2Medium'>
                  <img
                    src={iconSearch}
                    alt='iconSearch'
                    width={15}
                    className='mr-1'
                  />
                  검색하기
                </div>
              </button>
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ backgroundColor: '#C1E9E8' }}>
          <Col span={24} style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>
              🔘 빠른 접근
            </h2>
          </Col>

          <Col xs={24} sm={8}>
            <Card
              hoverable
              title='기능 A'
              style={{ textAlign: 'center' }}
              onClick={() => navigate('/feature-a')}
            >
              A입니다.
            </Card>
          </Col>

          <Col xs={24} sm={8}>
            <Card
              hoverable
              title='기능 B'
              style={{ textAlign: 'center' }}
              onClick={() => navigate('/feature-b')}
            >
              B입니다.
            </Card>
          </Col>

          <Col xs={24} sm={8}>
            <Card
              hoverable
              title='기능 C'
              style={{ textAlign: 'center' }}
              onClick={() => navigate('/feature-c')}
            >
              C입니다.
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LandingPage;
