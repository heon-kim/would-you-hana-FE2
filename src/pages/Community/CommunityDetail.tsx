import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { relativeTime } from '../../utils/stringFormat';
import ImgBank from '../../assets/img/img_community3.jpg';
import Comments from '../../components/board/QuestionDetail/Comments/Comments';
import { useSelector } from 'react-redux';
import { RootState } from '../../hoc/store';
import { getCommunityPosts } from '../../utils/communityPostStorage';
import { Post } from '../../types/post';
import { communityService } from '../../services/community.service';
import { CommunityResponseDTO } from '../../types/dto/community.dto';
// interface Reply {
//   id: number;
//   author: string;
//   content: string;
//   replies: Reply[];
// }

// interface Comment {
//   id: number;
//   author: string;
//   content: string;
//   replies: Reply[];
// }

// interface DataType {
//   id: number;
//   category: string;
//   title: string;
//   content: string;
//   author: string;
//   views: number;
//   likes: number;
//   scraps: number;
//   image: boolean;
//   comments: Comment[];
// }

// // Post를 DataType으로 변환하는 함수 추가
// const convertPostToDataType = (post: Post): DataType => ({
//   ...post,
//   views: post.counts.views,
//   likes: post.counts.likes,
//   scraps: 0,
//   image: true,
//   comments: []
// });

const CommunityDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  // const [post, setPost] = useState<DataType | null>(null);
  const [post, setPost] = useState<CommunityResponseDTO|null>(null);
  
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

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
                {/* <span>좋아요 {post.likeCount}</span>
                <span>스크랩 {post.scrapCount}</span> */}
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
              {post.image && (
                <img 
                  src={ImgBank} 
                  alt="Post" 
                  className="w-4/5 mt-5" 
                />
              )}
            </div>

            {/* 게시글 푸터 */}
            <div className="text-gray-400" style={{fontSize:'13px'}}>
              <span>{relativeTime(+new Date(post.createdAt))}</span>
              <span className="ml-4">
                <LikeOutlined /> {post.likeCount}
              </span>
              <span className="ml-4">
                {/* 임시 주석!! */}
                {/* <MessageOutlined /> {post.comments.length} */} 
              </span>
            </div>
          </div>

          {/* 댓글 섹션 */}
          <Comments 
            isAuthenticated={isAuthenticated}
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





