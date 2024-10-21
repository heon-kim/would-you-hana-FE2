import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Carousel } from 'antd';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../store'; // Assuming this is your Redux store's RootState type

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
//   const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
//   const dispatch = useDispatch();

  return (
    <div style={{ width: '100%', padding: '50px 0', backgroundColor: '#f0f2f5' }}>
      <div style={{ marginLeft: '15%', marginRight: '15%', textAlign: 'center' }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Welcome to Our Homepage</h1>
            <p style={{ fontSize: '18px', color: '#555' }}>
              Explore our services and learn more about what we offer.
            </p>
          </Col>

          <Col span={24}>
            <Carousel autoplay>
              <div>
                <h3 style={carouselContentStyle}>Discover Our Products</h3>
              </div>
              <div>
                <h3 style={carouselContentStyle}>Exclusive Offers Available Now</h3>
              </div>
              <div>
                <h3 style={carouselContentStyle}>Join Our Community</h3>
              </div>
            </Carousel>
          </Col>

          <Col span={24} style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>🔘 Quick Access</h2>
          </Col>

          <Col xs={24} sm={8}>
            <Card
              hoverable
              title="Feature A"
              style={{ textAlign: 'center' }}
              onClick={() => navigate('/feature-a')}
            >
              Learn more about Feature A.
            </Card>
          </Col>

          <Col xs={24} sm={8}>
            <Card
              hoverable
              title="Feature B"
              style={{ textAlign: 'center' }}
              onClick={() => navigate('/feature-b')}
            >
              Learn more about Feature B.
            </Card>
          </Col>

          <Col xs={24} sm={8}>
            <Card
              hoverable
              title="Feature C"
              style={{ textAlign: 'center' }}
              onClick={() => navigate('/feature-c')}
            >
              Learn more about Feature C.
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

// Style for Carousel content
const carouselContentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

export default LandingPage;
