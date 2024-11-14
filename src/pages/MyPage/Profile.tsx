import React from 'react';
import { Layout, Row, Col, Avatar, Card } from 'antd';
import { UserOutlined, HeartOutlined, MessageOutlined, CommentOutlined } from '@ant-design/icons';
import userIcon from '../../assets/img/icon_user.png'; // 사용자 아이콘 경로
import star4 from '../../assets/img/stars/star4.png';
import BankerCard from '../../components/BankerCard';
import banker1 from '../../assets/img/banker1.png'
import banker2 from '../../assets/img/banker2.png'
import banker3 from '../../assets/img/banker3.png'
import banker4 from '../../assets/img/banker4.png'


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
                <img className='h-40' src={star4} alt='star4' />
            </div>
        </Card>
        </Col>
        </Row>


        {/* 나에게 답변해준 은행원 */}
        <Card title="나에게 답변해 준 행원" bordered={false} style={{ backgroundColor: '#FFFFFF', textAlign: 'left', margin: '40px 0' }}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <BankerCard
              name="홍 창 기"
              title="PM"
              description="주택 청약을 도와드리는 홍창기 차장 입니다. 많이 알고 있다고 생각하지만 실제로 보면 헷갈리는 주택청약에 대해서 알려드립니다."
              tags={['주택청약', '내집마련 더블업 적금', '주택청약종합저축']}
              imageUrl={banker2}
              branch="대리 - 하나가족 성동구 성수점"
            />
          </Col>
          <Col span={8}>
            <BankerCard
              name="강 백 호"
              title="RM"
              description="고객님의 입출금 통장을 책임지는 강백호 과장입니다. 어려운 금융 용어를 쉽고 정확하게 전달하여 고객님의 자산을 관리할 수 있도록 최선을 다하겠습니다.."
              tags={['주택청약', '내집마련 더블업 적금', '주택청약종합저축']}
              imageUrl={banker3}
              branch="대리 - 하나가족 광진구 군자역점"
            />
          </Col>
          <Col span={8}>
            <BankerCard
              name="문 보 경"
              title="RM"
              description="고객님의 대출을 책임지는 문보경 대리입니다. 광진구 신자양점에서 고객님의 아주 작은 고민까지도 하나만의 대출 솔루션으로 해결해 드리겠습니다."
              tags={['대출', '주택담보대출', '전세대출']}
              imageUrl={banker4}
              branch="대리 - 하나가족 광진구 신자양점"
            />
          </Col>
        </Row>
        </Card>

      </Content>
    </Layout>
  );
};

export default Profile;
