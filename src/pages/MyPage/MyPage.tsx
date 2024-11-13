import React, { useState, useEffect } from 'react'; 
import { Layout, Progress, Avatar, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom'; 
import { findUser } from '../../utils/userStorage';
import userIcon from '../../assets/img/icon_user.png';

const { Content, Sider } = Layout;

const MyPage: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState('profile'); 
  const [nickname, setNickname] = useState<string>('None'); // 닉네임 상태 관리
  const navigate = useNavigate();

  // 현재 로그인한 사용자 확인
  useEffect(() => {
    const loggedUser = localStorage.getItem('userEmail'); // 저장된 사용자 정보 가져오기
    if (loggedUser) {
      const user = findUser(loggedUser); // 사용자의 이메일로 정보 가져오기
      if (user) {
        setNickname(user.nickname); // 닉네임 설정
      }
    }
  }, []);

  const handleMenuClick = (key: string) => {
    setSelectedKey(key); 
    navigate(`/my/${key}`); 
  };

  const twoColors: ProgressProps['strokeColor'] = {
    '0%': '#70CCE1',
    '50%': '#21008B',  
    '100%': '#21008B',
  };

  return (
    <Layout style={{ backgroundColor: '#FFFFFF', marginTop: '70px' }}> 
      <Layout style={{ display: 'flex', backgroundColor: '#FFFFFF', minHeight: '30vh'}}>
        <Sider width="15%" style={{ backgroundColor: '#FFFFFF'}}></Sider>
        <Layout style={{ width: '85%'}}>
          <Content style={{ paddingBottom: '24px', paddingRight: '50px', paddingLeft: '50px', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
            <div style={{ display: 'flex',  alignItems: 'center', marginBottom: "10px",  }}> 
              <Avatar size={100} src={userIcon} icon={<UserOutlined />} />
            </div>
            <h2 style={{ fontSize: '20px', textAlign: 'left', fontWeight: 'bold', marginBottom:'10px'}}>{nickname}</h2> 
            <p style={{textAlign: 'left'}}>지구 1380</p>
            <Progress percent={60} status="active" strokeWidth={30} showInfo={false} strokeColor={twoColors} style={{ width: '100%', marginTop: '20pxs' }} />
          </Content>
        </Layout>
      </Layout>

      <Layout style={{ display: 'flex' }}>
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
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MyPage;
