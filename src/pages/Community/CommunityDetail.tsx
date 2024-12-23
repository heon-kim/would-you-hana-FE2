import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { relativeTime } from '../../utils/stringFormat';
import Comments from '../../components/board/QuestionDetail/Comments/Comments';
import { useSelector } from 'react-redux';
import { RootState } from '../../hoc/store';
import { communityService } from '../../services/community.service';
import { CommunityResponseDTO } from '../../types/dto/community.dto';

const CommunityDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<CommunityResponseDTO|null>(null);
  

  useEffect(() => {
    if (!postId) {
      message.error('게시글 ID가 없습니다.');
      navigate('/404');
      return;
    }

    const fetchPost = async() => {
      try{
        const response = await communityService.getCommunityDetail(parseInt(postId));
        if(!response || !response.data){
          message.error('게시글을 찾을 수 없습니다.');
          navigate('/404');
          return;
        }

        setPost(response.data);
      }catch(error){
        message.error('게시글을 불러오는 중 오류가 발생했습니다.');
        navigate('/404');
      }
    };
    fetchPost();
  }, [postId, navigate]);

  if (!post) return null;

  return (
    <div className="w-full px-[25%] py-10">
      <div className="flex gap-5">
        <div className="w-full flex flex-col gap-6">
          {/* 게시글 헤더 */}
          <div className="flex flex-col gap-6 pb-3 border-b border-gray-200">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-bold">
                {post.title}
              </h1>
              <div className="flex gap-1 text-gray-400" style={{fontSize:'13px'}}>
                <span>조회 {post.viewCount}</span>
                <span>·</span>
                <span>{post.nickname}</span>
              </div>
              <div className="flex justify-end">
                <Button icon={<StarOutlined />}>스크랩</Button>
              </div>
            </div>

            {/* 게시글 내용 */}
            <div className="w-full">
              <p>{post.content}</p>
            </div>

            {/* 게시글 푸터 */}
            <div className="text-gray-400" style={{fontSize:'13px'}}>
              <span>{relativeTime(+new Date(post.createdAt))}</span>
              <span className="ml-4">
                <LikeOutlined /> {post.likeCount}
              </span>
              <span className="ml-4">
                <MessageOutlined /> {post.commentList.length} 
              </span>
            </div>
          </div>

          {/* 댓글 섹션 */}
          <Comments
            type="post"
            commentList={post.commentList}
          />
        </div>

        {/* 사이드바 영역이 필요한 경우 추가 */}
        {/* <div className="w-1/4"> */}
          {/* 사이드바 컴포넌트들 */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default CommunityDetail;





