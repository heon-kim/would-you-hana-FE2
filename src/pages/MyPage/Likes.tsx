import React, { useState } from 'react';
import PostList from '../../components/PostList';
import { useNavigate } from 'react-router-dom';
interface Post {
  id: number;
  title: string;
  views: number;
  likes: number;
  comments: number;
  createdAt: string;
  category: string;
}

const posts: Post[] = [
  {
    id: 1,
    title: '해외에서도 금융인증서를 이용할 수 있나요?',
    views: 43,
    likes: 80,
    comments: 17,
    createdAt: '2024-01-01',
    category: '외환 및 국제금융',
  },
  {
    id: 2,
    title: '모바일 OTP를 활성화하려면 어떻게 하나요?',
    views: 9,
    likes: 10,
    comments: 10,
    createdAt: '2024-11-10',
    category: '전자금융',
  },
  {
    id: 3,
    title: '장기 미사용 이체 제한 거래 정지가 되었습니다.',
    views: 12,
    likes: 20,
    comments: 9,
    createdAt: '2024-01-01',
    category: '기타',
  },
  {
    id: 4,
    title: '주거래 손님에게는 어떠한 혜택이 있나요?',
    views: 50,
    likes: 90,
    comments: 3,
    createdAt: '2024-01-01',
    category: '기타',
  },
  {
    id: 5,
    title: '연락처 이체시 받는 분도 하나원큐 앱이 설치되어 있어야 하나요?',
    views: 34,
    likes: 70,
    comments: 7,
    createdAt: '2024-01-01',
    category: '전자금융',
  },
  {
    id: 6,
    title: 'ISA 계좌의 세금 혜택이 어떻게 적용되나요?',
    views: 40,
    likes: 80,
    comments: 3,
    createdAt: '2024-01-01',
    category: '재무 계획',
  },
];

const Likes: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const postsPerPage = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePostClick = (postId: number) => {
    navigate(`/qna/detail/${postId}`); // 특정 포스트 ID로 페이지 이동
  };

  return (
    <div
      style={{
        padding:'5%'
      }}>
        <div style={{fontSize: '20px', fontWeight: 'bold', marginBottom:'20px'}}>좋아요</div>

        <PostList
        posts={currentPosts}
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        onPageChange={handlePageChange}
        onPostClick={handlePostClick}
      />
      </div>
    
  );
};

export default Likes;
