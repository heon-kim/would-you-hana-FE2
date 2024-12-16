import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { StarOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../hoc/store';
import { findPost, updatePost, deletePost } from '../../utils/postStorage';
import { Post } from '../../types/post';
import { AnswerInterface } from '../../types/post';
import Answer from '../../components/board/QuestionDetail/AnswerSection/Answer';
import AnswerInput from '../../components/board/QuestionDetail/AnswerSection/AnswerInput';
import Comments from '../../components/board/QuestionDetail/Comments/Comments';
import PostRegisterButton from '../../components/board/PostRegisterButton/PostRegisterButton';
import Chatbot from '../../components/Chatbot';
import { relativeTime } from '../../utils/stringFormat';

const QuestionDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showAnswerInput, setShowAnswerInput] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: AnswerInterface }>({});
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const { isAuthenticated, userRole, userEmail } = useSelector((state: RootState) => state.auth);

  const loadAnswers = useCallback(() => {
    const storedAnswers = localStorage.getItem('answers');
    return storedAnswers ? JSON.parse(storedAnswers) : {};
  }, []);

  const incrementViewCount = useCallback((post: Post) => {
    const updatedPost = {
      ...post,
      counts: {
        ...post.counts,
        views: post.counts.views + 1,
      },
    };
    updatePost(updatedPost);
    setPost(updatedPost);
  }, []);

  useEffect(() => {
    const parsedAnswers = loadAnswers();
    setAnswers(parsedAnswers);

    if (!postId) {
      message.error('질문 ID가 없습니다.');
      navigate('/404');
      return;
    }

    const foundPost = findPost(Number(postId));
    if (!foundPost) {
      message.error('질문을 찾을 수 없습니다.');
      navigate('/404');
      return;
    }

    setPost(foundPost);
    setIsAnswered(!!parsedAnswers[postId]);
    incrementViewCount(foundPost);
  }, [postId, navigate, incrementViewCount, loadAnswers]);

  const handleAnswerSubmit = useCallback((content: string) => {
    if (!postId || !post || !userEmail) return;

    const answerData: AnswerInterface = {
      id: Date.now(),
      content,
      authorEmail: userEmail,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedAnswers = {
      ...answers,
      [postId]: answerData,
    };

    setAnswers(updatedAnswers);
    localStorage.setItem('answers', JSON.stringify(updatedAnswers));

    const updatedPost = {
      ...post,
      answered: true,
    };
    updatePost(updatedPost);
    setPost(updatedPost);
    setIsAnswered(true);
    setShowAnswerInput(false);
  }, [postId, post, answers, userEmail]);

  const handlePostDelete = useCallback(() => {
    if (!postId) return;
    deletePost(Number(postId));
    navigate('/qna');
  }, [postId, navigate]);

  const toggleChatbot = useCallback(() => {
    setIsChatbotVisible(prev => !prev);
  }, []);

  if (!post || !postId) return null;

  return (
    <div className="w-full px-[15%] py-10">
      <div className="flex gap-5">
        <div className="w-3/4 flex flex-col gap-6">
          <div className="pb-3 border-b border-gray-200">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-bold">Q. {post.title}</h1>
              <div className="flex gap-4 text-xs text-gray-400">
                <span>{post.author}</span>
                <span>조회 {post.counts.views}</span>
                <span>좋아요 {post.counts.likes}</span>
                <span>스크랩 {post.counts.scraps}</span>
              </div>
              <div className="flex justify-end gap-2">
                {!isAnswered && userRole === 'B' && (
                  <Button
                    type="primary"
                    icon={<FormOutlined />}
                    onClick={() => setShowAnswerInput(true)}
                  >
                    답변하기
                  </Button>
                )}
                {post.email === userEmail && (
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={handlePostDelete}
                  >
                    삭제
                  </Button>
                )}
                <Button icon={<StarOutlined />}>스크랩</Button>
              </div>
            </div>
            <div className="w-full">
              <p>{post.content}</p>
            </div>
            <div className="text-gray-400">
              <span>{relativeTime(+new Date(post.createdAt))}</span>
            </div>
          </div>

          {isAnswered ? (
            <Answer answer={answers[postId]} />
          ) : (
            showAnswerInput && (
              <AnswerInput
                onSubmitAnswer={handleAnswerSubmit}
                onChatbotToggle={toggleChatbot}
              />
            )
          )}

          <Comments
            isAuthenticated={isAuthenticated}
          />
        </div>

        <aside className="w-1/4">
          <PostRegisterButton />
        </aside>
      </div>

      {isChatbotVisible && (
        <div className="fixed top-[120px] right-[10%] z-50">
          <Chatbot onClose={toggleChatbot} />
        </div>
      )}
    </div>
  );
};

export default QuestionDetail;
