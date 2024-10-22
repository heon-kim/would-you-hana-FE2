import React from 'react';
import { Layout, Row, Col, Avatar, Card } from 'antd';
import { UserOutlined, HeartOutlined, MessageOutlined, CommentOutlined } from '@ant-design/icons';
import userIcon from '../assets/img/icon_user.png'; // 사용자 아이콘 경로
import star4 from '../assets/img/stars/star4.png'; 


const { Content } = Layout;

const Profile: React.FC = () => {
  return (
    <Layout style={{ padding: '24px', backgroundColor: '#FFFFFF' }}>
      <Content style={{ backgroundColor: '#FFFFFF', padding: '24px'}}>
        {/* 내 정보 및 이 주의 활약 */}
        <Row gutter={[16, 16]} style={{ display: 'flex', minHeight: '240px' }}>
        <Col span={12}>
            <Card 
            title={<div style={{ textAlign: 'left' }}>내 정보</div>} // 제목을 왼쪽 정렬
            bordered={false} 
            style={{ backgroundColor: '#F0F0F0', height: '100%' }}
            >
            <div style={{ textAlign: 'center', fontSize: '20px' }}>
                <p style={{ margin: '10px 0' }}><HeartOutlined /> 좋아요: <span id="likes-count">999+</span></p>
                <p style={{ margin: '10px 0' }}><MessageOutlined /> 답변 수: <span id="answers-count">999+</span></p>
                <p style={{ margin: '10px 0' }}><CommentOutlined /> 댓글 수: <span id="comments-count">999+</span></p>
            </div> 


            </Card>
        </Col>
        <Col span={12}>
        <Card title={<div style={{ textAlign: 'left' }}>이 주의 활약</div>} bordered={false} style={{ backgroundColor: '#F0F0F0', height: '100%' }}>
            <div className="flex justify-center">
                <img className="h-40" src={star4} alt="star4" />
            </div>
        </Card>
        </Col>
        </Row>


        {/* 나에게 답변해준 은행원 */}
        <Card title="나에게 답변해 준 행원" bordered={false} style={{ backgroundColor: '#F0F0F0', textAlign: 'left', margin: '40px 0' }}>
        <Row gutter={[16, 16]}>
            <Col span={8}>
            <Card style={{ backgroundColor: 'transparent', textAlign: 'center', padding: '20px' }} >
                <Avatar size={150} src={userIcon} icon={<UserOutlined />} style={{ marginBottom: '10px' }} />
                <h3 style={{ margin: '0', fontWeight: 'bold', fontSize: '20px'}}>은행원 박지환</h3> {/* 제목 중앙 정렬 및 두께 증가 */}
                <p style={{ margin: '0' }}>군자역 지점</p> {/* 본문 중앙 정렬 */}
            </Card>
            </Col>
            
            <Col span={8}>
            <Card style={{ backgroundColor: 'transparent', textAlign: 'center', padding: '20px' }} >
                <Avatar size={150} src={userIcon} icon={<UserOutlined />} style={{ marginBottom: '10px' }} />
                <h3 style={{ margin: '0', fontWeight: 'bold', fontSize: '20px'}}>은행원 박지환</h3> {/* 제목 중앙 정렬 및 두께 증가 */}
                <p style={{ margin: '0' }}>군자역 지점</p> {/* 본문 중앙 정렬 */}
            </Card>
            </Col>

            <Col span={8}>
            <Card style={{ backgroundColor: 'transparent', textAlign: 'center', padding: '20px' }} >
                <Avatar size={150} src={userIcon} icon={<UserOutlined />} style={{ marginBottom: '10px' }} />
                <h3 style={{ margin: '0', fontWeight: 'bold', fontSize: '20px'}}>은행원 박지환</h3> {/* 제목 중앙 정렬 및 두께 증가 */}
                <p style={{ margin: '0' }}>군자역 지점</p> {/* 본문 중앙 정렬 */}
            </Card>
            </Col>
            
            
        </Row>
        </Card>

      </Content>
    </Layout>
  );
};

export default Profile;
