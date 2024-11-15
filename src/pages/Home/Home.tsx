import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card } from 'antd';
import notebookUser from '../../assets/img/notebook_byulsongi.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../hoc/store';

import '../../App.css';

import SearchInput from '../../components/SearchInput';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../store'; // Assuming this is your Redux store's RootState type
//const { Search } = Input;
// test
const Home: React.FC = () => {
  const navigate = useNavigate();

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
          <div style={{ marginLeft: '100px', marginTop: '15px' }}>
          <img
              src={notebookUser}
              alt="notebookUser"
              width={470}
              
            ></img>
          </div>
            
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
          
            {/* SearchInput 컴포넌트 사용 */}
            <div style={{marginRight:'100px'}}>
            <SearchInput onSearch={onSearch} />
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
