import React, { useState } from 'react';
import { getPosts } from '../../utils/postStorage';
import { Post } from '../../constants/posts';
import PostList from '../../components/PostList';
import { useNavigate } from 'react-router-dom';

const Likes: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const postsPerPage = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const posts: Post[] = getPosts();
  // 좋아요 list 중 userId == loggedUserId인 post 필터링
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePostClick = (postId: number) => {
    navigate(`/qna/detail/${postId}`); // 특정 포스트 ID로 페이지 이동
  };

  return (
    <div
      style={{
        padding: '5%',
      }}
    >
      <div
        style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}
      >
        좋아요
      </div>

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
