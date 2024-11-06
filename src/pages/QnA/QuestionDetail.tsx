import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { StarOutlined, FormOutlined } from '@ant-design/icons';
import { findPost } from '../../utils/postStorage';
import '../../App.css';
import PostRegisterButton from '../../components/PostRegisterButton';
import Comments from '../../components/post/Comments';
import Answer from '../../components/post/Answer';
import AnswerInput from '../../components/post/AnswerInput';
import { relativeTime } from '../../utils/stringFormat';
import { AnswerInterface } from '../../constants/posts';

const QuestionDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [isAnswered, setIsAnswered] = useState(false);
  const [showAnswerInput, setShowAnswerInput] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: AnswerInterface }>(
    {}
  );

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
      }
    }
  }, [postId, navigate]);

  const post = postId ? findPost(Number(postId)) : null;

  if (!post || !postId) return null;

  const handleAnswerSubmit = (content: string) => {
    const answerData = {
      id: Date.now(), // 고유 ID 생성
      content,
      authorEmail: 'example@example.com', // 로그인된 행원 email로 변경 필요
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
    setShowAnswerInput(false);
  };

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
              <div className='flex justify-end gap-4'>
                {!isAnswered && (
                  <Button
                    type='primary'
                    icon={<FormOutlined />}
                    onClick={() => setShowAnswerInput(true)}
                  >
                    답변하기
                  </Button>
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
              <AnswerInput onSubmitAnswer={handleAnswerSubmit} />
            )
          )}
          <Comments />
        </div>
        <aside className='widget' style={{ width: '30%' }}>
          <PostRegisterButton />
        </aside>
      </div>
    </div>
  );
};

export default QuestionDetail;
