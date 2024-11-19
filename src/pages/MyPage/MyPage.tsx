import React, { useState, useEffect } from 'react';
import { Layout, Progress, Avatar, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom';
import { findUser, findBanker } from '../../utils/userStorage';
import userIcon from '../../assets/img/icon_user.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../hoc/store';

const { Content, Sider } = Layout;

const MyPage: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState('profile');
  const [nicknameOrRealname, setNicknameOrRealname] = useState<string>('None'); // 닉네임 상태 관리
  const userRole = useSelector((state: RootState) => state.auth.userRole);

  const navigate = useNavigate();

  // 현재 로그인한 사용자 확인
  useEffect(() => {
    const loggedUser = localStorage.getItem('userEmail'); // 저장된 사용자 정보 가져오기
    if (loggedUser) {
      const user = findUser(loggedUser);
      const banker = findBanker(loggedUser);
      if (user) { // 고객이라면
        setNicknameOrRealname(user.nickname); // 닉네임 설정
      }
      else if (banker) { // 행원이라면
        const user = banker;
        setNicknameOrRealname(user.name);
      }

    }
  }, []);

  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
    navigate(`/my/${key}`);
  };

  const twoColors = {
    '0%': '#70CCE1',
    '50%': '#21008B',
    '100%': '#21008B',
  };


  const customerMenus = [
    { key: 'profile', label: '프로필'},
    { key: 'posts', label: '게시글' },
    { key: 'likes', label: '좋아요' },
    { key: 'scrap', label: '스크랩' },
    { key: 'edit', label: '개인정보 수정' },
    { key: 'district', label: '관심지역 설정' },
  ];

  const bankerMenus = [
    { key: 'profile', label: '프로필'},
    { key: 'edit', label: '개인정보 수정' },
  ]


  return (
    <Layout style={{ backgroundColor: '#FFFFFF' }}>
      {/* 상단 유저 정보 */}
      {userRole=='C'&& (
        <Layout style={{ display: 'flex', backgroundColor: '#FFFFFF', minHeight: '30vh', marginTop: '50px' }}>
        <Sider width="15%" style={{ backgroundColor: '#FFFFFF' }}></Sider>
        <Layout style={{ width: '75%' }}>
          <Content style={{ paddingBottom: '24px', paddingRight: '50px', paddingLeft: '50px', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: "10px", }}>
              <Avatar size={100} src={userIcon} icon={<UserOutlined />} />
            </div>
            <h2 style={{ fontSize: '20px', textAlign: 'left', fontWeight: 'bold', marginBottom: '10px' }}>{nicknameOrRealname}</h2>
            <p style={{ textAlign: 'left' }}>지구 1380</p>
            <Progress percent={60} status="active" strokeWidth={30} showInfo={false} strokeColor={twoColors} style={{ width: '100%', marginTop: '20pxs' }} />
          </Content>
        </Layout>
        <Layout style={{ width: '10%' }}> {/*오른쪽 padding용*/}
          <Content style={{ backgroundColor: '#FFFFFF' }}>
          </Content>
        </Layout>
      </Layout>
     )}
      
      <Layout style={{ display: 'flex' }}>
        {/* 좌측 메뉴 */}
        <Sider width={200} style={{ fontWeight: 'bold', backgroundColor: '#FFFFFF', borderRight: '1px solid #D9D9D9', borderTop: '1px solid #D9D9D9' }}>
        <Menu
          selectedKeys={[selectedKey]}
          style={{ borderRight: 'none' }}
          items={userRole=='C'?customerMenus:bankerMenus}
          onClick={({ key }) => handleMenuClick(key)}
        />
        </Sider>
        {/* 메인 컨텐츠 */}
        <Layout>
          <Content style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #D9D9D9' }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MyPage;
