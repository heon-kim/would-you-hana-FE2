import React from 'react';
import { useNavigate } from 'react-router-dom';
import iconPencil from '../assets/img/icon_pencil.svg';
import { getAuthToken, getUserRole } from '../hoc/request';
import { message } from 'antd';

const PostRegisterButton: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const isLoggedIn = getAuthToken();
    const isUser = getUserRole();
    console.log(isLoggedIn);
    //로그인 여부 확인 후,
    //로그인 했으면 질문등록하기로 이동.
    //로그인 안했으면 로그인/회원가입 페이지로 이동.
    if (isLoggedIn === 'null' || !isLoggedIn) {
      message.warning('로그인이 필요합니다.');
      navigate('/login');
    } 
    else if(isUser === 'B') {
      message.warning('행원은 Q&A를 작성할 수 없습니다!');
    }
    else {
      navigate('/qna/regist');
    }

  };

  return (
    <div
      style={{
        backgroundColor: '#F3F5F7',
        height: 'auto',
        alignContent: 'center',
        borderRadius: '5px',
        padding: '20px'
      }}
    >
      <div style={{ marginBottom: '25px' }}>
        <p style={{ lineHeight: '1.5', fontSize: '18px' }}>
          찾으시는 질문이 없으신가요?
        </p>
        <p
          style={{ lineHeight: '1.9', fontSize: '14px', marginBottom: '10px' }}
        >
          이 게시판에 질문해보세요.
        </p>
      </div>
      <button
        onClick={handleButtonClick}
        style={{
          backgroundColor: '#008485',
          borderRadius: '5px',
          width: '100%',
          color: 'white',
          height: '50px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p>질문하기</p>
          <img
            src={iconPencil}
            alt='iconPencil'
            width={20}
            style={{ marginLeft: '3px' }}
          />
        </div>
      </button>
    </div>
  );
};

export default PostRegisterButton;
