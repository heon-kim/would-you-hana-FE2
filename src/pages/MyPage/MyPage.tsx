import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../hoc/store';
import '../../App.css'

const { Content, Sider } = Layout;

const MyPage: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState('profile');
  const userRole = useSelector((state: RootState) => state.auth.userRole);

  const navigate = useNavigate();

  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
    navigate(`/my/${key}`);
  };


  const customerMenus = [
    { key: 'profile', label: '프로필'},
    { key: 'reservation', label: '예약 내역'},
    { key: 'posts', label: '게시글' },
    { key: 'likes', label: '좋아요' },
    { key: 'qnaScrap', label: 'QnA 스크랩' },
    { key: 'communityScrap', label: '커뮤니티 스크랩' },
    { key: 'edit', label: '개인정보 수정' },
    { key: 'district', label: '관심지역 설정' },
  ];

  const bankerMenus = [
    { key: 'profile', label: '프로필'},
    { key: 'bankerReservation', label: '예약 현황'},
    { key: 'edit', label: '개인정보 수정' },
  ]


  return (
    <Layout style={{ backgroundColor: '#FFFFFF', display: 'flex' }}>
      {/* 좌측 메뉴 */}
      <Sider
        width={200}
        style={{
          fontWeight: 'bold',
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #D9D9D9',
        }}
      >
        <Menu
          selectedKeys={[selectedKey]}
          style={{ borderRight: 'none' }}
          items={userRole == 'C' ? customerMenus : bankerMenus}
          onClick={({ key }) => handleMenuClick(key)}
        />
      </Sider>
      {/* 메인 컨텐츠 */}
      <Layout>
        <Content
          style={{
            backgroundColor: '#FFFFFF',
            padding: '30px',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyPage;
