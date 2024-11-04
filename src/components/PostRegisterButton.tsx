import React from 'react';
import { useNavigate } from 'react-router-dom';
import iconPencil from '../assets/img/icon_pencil.svg';
import { getAuthToken } from '../hoc/request';
import { message } from 'antd';

const PostRegisterButton: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const isLoggedIn = getAuthToken();
    //로그인 여부 확인 후,
    //로그인 했으면 질문등록하기로 이동.
    //로그인 안했으면 로그인/회원가입 페이지로 이동.
    if (isLoggedIn === 'null' || !isLoggedIn) {
      message.warning('로그인이 필요합니다.');
      navigate('/login');
    } else {
      navigate('/qna/regist');
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#F3F5F7',
        height: '180px',
        alignContent: 'center',
        paddingLeft: '20px',
        paddingRight: '20px',
        borderRadius: '5px',
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
            alt='notebookUser'
            width={20}
            style={{ marginLeft: '3px' }}
          />
        </div>
      </button>
    </div>
  );
};

export default PostRegisterButton;
