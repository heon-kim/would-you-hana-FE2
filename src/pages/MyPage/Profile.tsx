import React from 'react';
import { Layout, Row, Col, Card } from 'antd';
import BankerCard from '../../components/BankerCard';
import banker2 from '../../assets/img/banker2.png';
import banker3 from '../../assets/img/banker3.png';
import banker4 from '../../assets/img/banker4.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../hoc/store';
import CustomerInfo from '../../components/my/CustomerInfo';
import Activity from '../../components/my/Activity';
import BankerInfo from '../../components/my/BankerInfo';

const { Content } = Layout;

const CustomerProfile: React.FC = () => {
  return (
    <Layout style={{ backgroundColor: '#FFFFFF' }}>
      {/* 상단 유저 정보 */}
      <CustomerInfo />
      <Content style={{ padding: '24px' }}>
        {/* 내 정보 및 이 주의 활약 */}
        <Activity />

        {/* 나에게 답변해준 은행원 */}
        <Card
          title="나에게 답변해 준 행원"
          bordered={false}
          style={{
            textAlign: 'left',
            margin: '40px 0',
          }}
        >
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

const BankerProfile: React.FC = () => {
  return (
    <>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
        프로필
      </h3>
      {/* 행원 정보 */}
      <BankerInfo />
      {/* 내 정보 및 이 주의 활약 */}
      <Activity />
    </>
  );
};

const Profile: React.FC = () => {
  const userRole = useSelector((state: RootState) => state.auth.userRole);

  return <>{userRole == 'C' ? <CustomerProfile /> : <BankerProfile />}</>;
};

export default Profile;
