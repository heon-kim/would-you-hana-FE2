import React, { useEffect, useState } from 'react';
import { getPosts } from '../../utils/postStorage';
import { Post } from '../../types/post';
import PostList from '../../components/board/PostList/PostList';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../hoc/store';
import { myPageService } from '../../services/mypage.service';

const CommunityScraps: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const postsPerPage = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
  const isLoggedIn = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePostClick = (postId: number) => {
    navigate(`/detail/${postId}`); // 특정 포스트 ID로 페이지 이동
  };

  useEffect(() => {
    const fetchScraps = async() => {
      try{
        const customerId = Number(localStorage.getItem('userId'));
        const response = await myPageService.getScrapedPosts(customerId);
        setPosts(response.data);
      }catch(error){
        console.error('failed to fetch scraps:', error);
      }
    };

    fetchScraps();
  }, []);

  return (
    <>
      <div
        style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}
      >
        커뮤니티 스크랩
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

export default CommunityScraps;
