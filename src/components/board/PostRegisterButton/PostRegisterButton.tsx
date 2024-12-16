import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import iconPencil from '../../../assets/img/icon_pencil.svg';
import { getAuthToken, getUserRole } from '../../../hoc/request';

const PostRegisterButton: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = useCallback(() => {
    const isLoggedIn = getAuthToken();
    const userRole = getUserRole();

    if (isLoggedIn === 'null' || !isLoggedIn) {
      message.warning('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    if (userRole === 'B') {
      message.warning('행원은 Q&A를 작성할 수 없습니다!');
      return;
    }

    navigate('/qna/regist');
  }, [navigate]);

  return (
    <div className="bg-[#F3F5F7] border border-[#CFCFCF40] rounded p-5">
      <div className="mb-6">
        <p className="text-lg leading-relaxed">
          찾으시는 질문이 없으신가요?
        </p>
        <p className="text-sm leading-loose mb-2.5">
          이 게시판에 질문해보세요.
        </p>
      </div>
      <button
        onClick={handleButtonClick}
        className="bg-[#008485] rounded w-full text-white h-[50px] hover:bg-[#006d6e] transition-colors"
      >
        <div className="flex items-center justify-center">
          <span>질문하기</span>
          <img
            src={iconPencil}
            alt="Write"
            className="w-5 ml-1"
          />
        </div>
      </button>
    </div>
  );
};

export default PostRegisterButton; 