import React, { useState } from 'react'; // useState 추가
import { Layout, Progress, Avatar, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom'; // Outlet 추가
import userIcon from '../assets/img/icon_user.png'; // 사용자 아이콘 경로

const { Content, Sider } = Layout;

const MyPage: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState('profile'); // 선택된 메뉴 키 상태 관리
  const navigate = useNavigate();

  const handleMenuClick = (key: string) => {
    setSelectedKey(key); // 선택된 키 업데이트
    navigate(`/my/${key}`); // 페이지 이동
  };

  return (
    <Layout style={{ backgroundColor: '#FFFFFF', marginTop: '70px' }}> {/* 전체 배경을 흰색으로 설정 */}
      {/* 사용자 정보 */}
      <Layout style={{ display: 'flex', backgroundColor: '#FFFFFF', minHeight: '30vh'}}>
        <Sider width="15%" style={{ backgroundColor: '#FFFFFF'}}></Sider>
        <Layout style={{ width: '85%'}}>
            <Content style={{ paddingBottom: '24px', paddingRight: '50px', paddingLeft: '50px', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
            <div style={{ display: 'flex',  alignItems: 'center', marginBottom: "10px",  }}> {/* flexbox를 사용하여 Avatar와 텍스트 정렬 */}
                <Avatar size={100} src={userIcon} icon={<UserOutlined />} />
            </div>
            <h2 style={{ fontSize: '20px', textAlign: 'left', fontWeight: 'bold', marginBottom:'10px'}}>User1</h2> {/* 왼쪽 마진 추가 */}
                <p style={{textAlign: 'left'}}>지구 1380</p>
            <Progress percent={60} status="active" strokeWidth={30} showInfo={false} strokeColor="#87d068" style={{ width: '100%', marginTop: '20pxs' }} />
            </Content>
        </Layout>
      </Layout>

      <Layout style={{ display: 'flex' }}> {/* Flexbox를 사용하여 레이아웃 조정 */}
        {/* 사이드 메뉴 */}
        <Sider width="15%" style={{ fontWeight: 'bold', padding:'48px', backgroundColor: '#FFFFFF', borderRight: '1px solid #D9D9D9', borderTop: '1px solid #D9D9D9'}}>
            <Menu mode="inline" selectedKeys={[selectedKey]} style={{ height: '100%', borderRight: 0 }}>
                <Menu.Item key="profile" onClick={() => handleMenuClick('profile')} style={{ color: selectedKey === 'profile' ? '#BFBFBF' : undefined, backgroundColor: 'transparent' }}>프로필</Menu.Item>
                <Menu.Item key="posts" onClick={() => handleMenuClick('posts')} style={{ color: selectedKey === 'posts' ? '#BFBFBF' : undefined, backgroundColor: 'transparent' }}>게시글</Menu.Item>
                <Menu.Item key="likes" onClick={() => handleMenuClick('likes')} style={{ color: selectedKey === 'likes' ? '#BFBFBF' : undefined, backgroundColor: 'transparent' }}>좋아요</Menu.Item>
                <Menu.Item key="scrap" onClick={() => handleMenuClick('scrap')} style={{ color: selectedKey === 'scrap' ? '#BFBFBF' : undefined, backgroundColor: 'transparent' }}>스크랩</Menu.Item>
                <Menu.Item key="edit" onClick={() => handleMenuClick('edit')} style={{ color: selectedKey === 'edit' ? '#BFBFBF' : undefined, backgroundColor: 'transparent' }}>개인정보 수정</Menu.Item>
                <Menu.Item key="auth" onClick={() => handleMenuClick('auth')} style={{ color: selectedKey === 'auth' ? '#BFBFBF' : undefined, backgroundColor: 'transparent' }}>동네 인증</Menu.Item>
            </Menu>
        </Sider>

        <Layout style={{ width: '85%' }}>
          <Content style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #D9D9D9' }}>
            {/* Outlet을 통해 라우팅된 콘텐츠를 렌더링 */}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MyPage;
