import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { StarOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { findPost, updatePost, deletePost } from '../../utils/postStorage';  // updatePost 함수 추가
import '../../App.css';
import PostRegisterButton from '../../components/PostRegisterButton';
import Comments from '../../components/post/Comments';
import Answer from '../../components/post/Answer';
import AnswerInput from '../../components/post/AnswerInput';
import { relativeTime } from '../../utils/stringFormat';
import { AnswerInterface } from '../../constants/posts';
import { useSelector } from 'react-redux';
import { RootState } from '../../hoc/store';
import Chatbot from '../../components/Chatbot';
import { Root } from 'react-dom/client';
import { deleteAllComments } from '../../utils/commentStorage';

const QuestionDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [isAnswered, setIsAnswered] = useState(false);
  const [showAnswerInput, setShowAnswerInput] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: AnswerInterface }>({});
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const userEmail = useSelector((state: RootState) => state.auth.userEmail);

  const navigate = useNavigate();

  useEffect(() => {
    const storedAnswers = localStorage.getItem('answers');
    const parsedAnswers = storedAnswers ? JSON.parse(storedAnswers) : {};
    setAnswers(parsedAnswers);

    if (!postId) {
      message.error('질문 ID가 없습니다.');
      navigate('/404');
    } else {
      const post = findPost(Number(postId));
      if (!post) {
        message.error('질문을 찾을 수 없습니다.');
        navigate('/404');
      } else {
        setIsAnswered(!!parsedAnswers[postId]); // 해당 postId에 답변이 있는지 확인
        // View count 증가
        incrementViewCount(post);
      }
    }
  }, [postId, navigate]);

  // View count 증가 함수
  const incrementViewCount = (post: Post) => {
    if (post) {
      const updatedPost = {
        ...post,
        counts: {
          ...post.counts,
          views: post.counts.views + 1, // views 증가
        },
      };

      // 로컬 스토리지에 저장된 post 데이터 업데이트
      updatePost(updatedPost);
    }
  };

  const post = postId ? findPost(Number(postId)) : null;

  if (!post || !postId) return null;

  const handleAnswerSubmit = (content: string) => {
    const answerData = {
      id: Date.now(), // 고유 ID 생성
      content,
      authorEmail: userEmail, // 로그인된 사용자 email
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedAnswers = {
      ...answers,
      [postId]: answerData,
    };

    setAnswers(updatedAnswers);
    localStorage.setItem('answers', JSON.stringify(updatedAnswers));

    setIsAnswered(true);
    const post = findPost(Number(postId));
    makeAnsweredTrue(post);
    setShowAnswerInput(false);
  };

  // 답변완료 처리
  const makeAnsweredTrue = (post: Post) => {
    if (post) {
      const updatedPost = {
        ...post,
        answered: true,
      };

      // 로컬 스토리지에 저장된 post 데이터 업데이트
      updatePost(updatedPost);
    }
  };
  
  const toggleChatbot = () => {
    setIsChatbotVisible((prev) => !prev);
  };

  const handlePostDelete = () => {
    console.log(postId);
    deletePost(Number(postId));
    navigate('/qna');
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
        width: '100%',
        paddingLeft: '15%',
        paddingRight: '15%',
        alignSelf: 'center',
        paddingTop: '40px',
        paddingBottom: '20px',
      }}
    >
      <div className='flex w-full' style={{ gap: '20px' }}>
        <div
          className='article flex flex-col gap-6 w-full'
          style={{ width: '75%' }}
        >
          <div className='question flex flex-col gap-6 font-ligh pb-3 border-b border-gray-200'>
            <div className='question__header flex flex-col gap-3'>
              <h1
                style={{
                  color: 'black',
                  fontSize: '30px',
                  lineHeight: '1.2',
                  fontWeight: 'bold',
                }}
              >
                Q. {post.title}
              </h1>
              <div className='flex gap-4 text-xs text-gray-400'>
                <span>{post.author}</span>
                <span>조회 {post.counts.views || 0}</span>
                <span>좋아요 {post.counts.likes || 0}</span>
                <span>스크랩 {post.counts.scraps || 0}</span>
              </div>
              <div className='flex justify-end gap-2'>
                {!isAnswered && userRole === 'B' && (
                  <Button
                    type="primary"
                    icon={<FormOutlined />}
                    onClick={() => setShowAnswerInput(true)}
                  >
                    답변하기
                  </Button>
                )}
                {(post.email === userEmail) && (
                  <Button icon={<DeleteOutlined />}
                  onClick={handlePostDelete}>삭제</Button>
                )}
                <Button icon={<StarOutlined />}>스크랩</Button>
              </div>
            </div>
            <div className='w-full'>
              <p>{post.content}</p>
            </div>
            <div className='post__footer text-gray-400'>
              <span>{relativeTime(+new Date(post.createdAt))}</span>
            </div>
          </div>
          {isAnswered ? (
            <Answer answer={answers[postId]} />
          ) : (
            showAnswerInput && (
              <AnswerInput onSubmitAnswer={handleAnswerSubmit} onChatbotToggle={toggleChatbot} />
            )
          )}
          <Comments isAuthenticated={isAuthenticated} />
        </div>
        <aside className='widget' style={{ width: '30%' }}>
          <PostRegisterButton />
        </aside>
      </div>
      {isChatbotVisible && (
        <div
          style={{
            position: 'absolute',
            top: '120px',
            right: '10%',
            zIndex: 2000,
          }}
        >
          <Chatbot onClose={toggleChatbot} />
        </div>
      )}
    </div>
  );
};

export default QuestionDetail;
