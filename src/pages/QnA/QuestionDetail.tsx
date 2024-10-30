import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { findPost } from '../../utils/postStorage';
import '../../App.css';
import PostRegisterButton from '../../components/PostRegisterButton';
import Comments from '../../components/post/Comments';
// import Answer from '../../components/post/Answer';
import { relativeTime } from '../../utils/stringFormat';

const QuestionDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!postId) {
      message.error('질문 ID가 없습니다.');
      navigate('/404');
    } else {
      const post = findPost(Number(postId));
      if (!post) {
        message.error('질문을 찾을 수 없습니다.');
        navigate('/404');
      }
    }
  }, [postId, navigate]);

  const post = postId ? findPost(Number(postId)) : null;

  if (!post) return null; // post가 없으면 아무것도 렌더링하지 않음

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
      <div className="flex w-full" style={{ gap: '20px' }}>
        <div
          className="article flex flex-col gap-6 w-full"
          style={{ width: '75%' }}
        >
          <div className="question flex flex-col gap-6 font-light">
            <div className="question__header flex flex-col gap-3">
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
              <div className="flex gap-4 text-xs text-gray-400">
                <span>{post.author}</span>
                <span>조회 {post.counts.views || 0}</span>
                <span>좋아요 {post.counts.likes || 0}</span>
                <span>스크랩 {post.counts.scraps || 0}</span>
              </div>
              <div className="flex justify-end gap-4">
                <Button icon={<StarOutlined />}>스크랩</Button>
              </div>
            </div>
            <div className="w-full">
              <p>{post.content}</p>
            </div>
            <div className="post__footer text-gray-400">
              <span>{relativeTime(+new Date(post.createdAt))}</span>
            </div>
          </div>
          {/* <Answer /> */}
          <Comments />
        </div>
        <aside className="widget" style={{ width: '30%' }}>
          <PostRegisterButton />
        </aside>
      </div>
    </div>
  );
};

export default QuestionDetail;
