import React, { useEffect, useState } from 'react';
// import { getPosts } from '../../utils/postStorage';
import { Post } from '../../types/post';
import PostList from '../../components/board/PostList/PostList';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../hoc/store';
import { myPageService } from '../../services/mypage.service';

const Likes: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const postsPerPage = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // 좋아요 list 중 userId == loggedUserId인 post 필터링
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePostClick = (postId: number) => {
    navigate(`/community/detail/${postId}`); // 특정 커뮤니티 포스트 ID로 페이지 이동
  };

  useEffect(() => {
    const fetchLikedPosts = async() => {
    try{
      const customerId = Number(localStorage.getItem('userId'));
      const response = await myPageService.getLikedPosts(customerId);
      console.log(customerId);
      setPosts(response.data);
    }catch(error){
      console.error('failed to fetch liked posts:', error);
    }
  };

    fetchLikedPosts();
  }, []);

  return (
    <>
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
    </>
  );
};

export default Likes;
