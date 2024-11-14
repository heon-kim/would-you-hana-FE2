import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card } from 'antd';
import notebookUser from '../../assets/img/notebook_byulsongi.png';
import iconSearch from '../../assets/img/icon_search.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../hoc/store';

import '../../App.css';
import { Root } from 'react-dom/client';
import SearchDropdown from '../../components/SearchDropdown';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../store'; // Assuming this is your Redux store's RootState type
//const { Search } = Input;
// test
const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchSelected, setSearchSelected] = useState('Q&A'); // 카테고리 상태 관리

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const userEmail = useSelector((state: RootState) => state.auth.userEmail);
  const userLocation = useSelector((state: RootState) => state.auth.userLocation);

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
          gutter={[16, 16]}
          style={{ backgroundColor: '#DDFCD2', height: '600px' }}
        >
          {/* Carousel Column */}
          <Col span={12} style={{ marginTop: '100px' }}>
            <img
              src={notebookUser}
              alt="notebookUser"
              width={470}
              style={{ marginLeft: '100px', marginTop: '15px' }}
            ></img>
          </Col>

          {/* Search Input Column */}
          <Col span={12} style={{ alignContent: 'center', marginLeft: '0px' }}>
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
            <div
              style={{
                display: 'flex',
                justifyContent: 'start',
                // alignItems: 'center',
                marginTop: '40px',
              }}
            >
            <SearchDropdown value={searchSelected} onChange={setSearchSelected} />
              <input
                style={{
                  width: '53%', //기존 '65%'
                  marginRight: '10px',
                  height: '55px',
                  borderRadius: '0 6px 6px 0', //기존 borderRadius: '6px'
                  padding: '8px',
                  fontFamily: 'Hana2Medium',
                  fontSize: '15px',
                  borderLeft: 'none', //추가
                }}
                className="border rounded-md p-2 w-full 
                  focus:outline-none focus:ring-2 focus:ring-mainColor focus:shadow-md hover:ring-2 hover:ring-mainColor transition duration-800"
                placeholder="질문을 입력하세요."
              ></input>
              <button className="bg-[#008485] w-[120px] h-[55px] rounded-lg p-2 text-white text-[15px] hover:bg-[#006f6f] transition-color duration-300">
                <div className="flex items-center justify-center">
                  <img
                    src={iconSearch}
                    alt="iconSearch"
                    width={15}
                    className="mr-1"
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
              인기 질문 🔥
            </h2>
          </Col>

          <Col xs={24} sm={8}>
            <Card
              hoverable
              title="관악구 인기 질문"
              style={{ textAlign: 'center' }}
              onClick={() => navigate('/feature-a')}
            >
              A입니다.
            </Card>
          </Col>

          <Col xs={24} sm={8}>
            <Card
              hoverable
              title="성동구 인기 질문"
              style={{ textAlign: 'center' }}
              onClick={() => navigate('/feature-b')}
            >
              B입니다.
            </Card>
          </Col>

          <Col xs={24} sm={8}>
            <Card
              hoverable
              title="동작구 인기 질문"
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

export default Home;
