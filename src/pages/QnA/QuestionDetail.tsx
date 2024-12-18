import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { StarOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../hoc/store';
import { QuestionResponseDTO } from '../../types/dto/question.dto';
import Answer from '../../components/board/QuestionDetail/AnswerSection/Answer';
import AnswerInput from '../../components/board/QuestionDetail/AnswerSection/AnswerInput';
import Comments from '../../components/board/QuestionDetail/Comments/Comments';
import PostRegisterButton from '../../components/board/PostRegisterButton/PostRegisterButton';
import Chatbot from '../../components/Chatbot';
import { relativeTime } from '../../utils/stringFormat';
import { qnaService } from '../../services/qna.service';


const QuestionDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  
  const [post, setPost] = useState<QuestionResponseDTO | null>(null);
  const [showAnswerInput, setShowAnswerInput] = useState(false);
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const { isAuthenticated, userRole, userId } = useSelector((state: RootState) => state.auth);

  // 임시 주석 처리
  // const loadAnswers = useCallback(() => {
  //   const storedAnswers = localStorage.getItem('answers');
  //   return storedAnswers ? JSON.parse(storedAnswers) : {};
  // }, []);

  // const incrementViewCount = useCallback((post: Post) => {
  //   const updatedPost = {
  //     ...post,
  //     viewCount: post.viewCount + 1
  //   };
  //   updatePost(updatedPost);
  //   setPost(updatedPost);
  // }, []);

  // 게시글 조회
  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        message.error('질문 ID가 없습니다.');
        navigate('/404');
        return;
      }

      try {
        const response = await qnaService.getQuestionDetail(parseInt(postId));
        setPost(response.data);
      } catch (error) {
        console.error('Failed to fetch post:', error);
        message.error('게시글을 불러오는데 실패했습니다.');
        navigate('/404');
      }
    };

    fetchPost();
  }, [postId, navigate]);

  // 답변 제출
  const handleAnswerSubmit = useCallback(async (content: string) => {
    if (!postId || !post || !userId) return;

    try {
      // 답변 등록 API 호출 
      await qnaService.postAnswer(parseInt(postId), {
        bankerId: userId,
        content
      });

      // 답변 등록 후 게시글 새로고침
      const updatedPost = await qnaService.getQuestionDetail(parseInt(postId));
      setPost(updatedPost.data);
      setShowAnswerInput(false);
      console.log(showAnswerInput)
      message.success('답변이 등록되었습니다.');
    } catch (error) {
      console.error('Failed to submit answer:', error);
      message.error('답변 등록에 실패했습니다.');
    }
  }, [postId, post, userId]);

  // 게시글 삭제
  const handlePostDelete = useCallback(async () => {
    if (!postId) return;

    try {
      await qnaService.deleteQuestion(parseInt(postId));
      message.success('게시글이 삭제되었습니다.');
      navigate('/qna');
    } catch (error) {
      console.error('Failed to delete post:', error);
      message.error('게시글 삭제에 실패했습니다.');
    }
  }, [postId, navigate]);

  const toggleChatbot = useCallback(() => {
    setIsChatbotVisible(prev => !prev);
  }, []);

  if (!post) return null;

  return (
    <div className="w-full px-[15%] py-10">
      <div className="flex gap-5">
        <div className="w-3/4 flex flex-col gap-6">
          <div className="pb-3 border-b border-gray-200">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-bold">Q. {post.title}</h1>
              <div className="flex gap-4 text-xs text-gray-400">
                <span>{post.customerId}</span>
                <span>조회 {post.viewCount}</span>
                <span>좋아요 {post.likeCount}</span>
                <span>스크랩 {post.scrapCount}</span>
              </div>
              <div className="flex justify-end gap-2">
                {post.commentList.length === 0 && userRole === 'B' && (
                  <Button
                    type="primary"
                    icon={<FormOutlined />}
                    onClick={() => setShowAnswerInput(true)}
                  >
                    답변하기
                  </Button>
                )}
                {post.customerId === userId && (
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

          {post.answer ? (
            <Answer answer={post.answer} />
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
