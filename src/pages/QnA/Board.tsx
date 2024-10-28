import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useHistory import 추가
import HotPosts from '../../components/HotPost';
import Category from '../../components/Category';
import PostList from '../../components/PostList';
import { Input } from 'antd';
import PostRegisterButton from '../../components/PostRegisterButton';
import { getPosts } from '../../utils/postStorage';
import { Post } from '../../constants/posts';

const Board: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [sortOrder, setSortOrder] = useState<string>('최근 답변순');
  const [searchText, setSearchText] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false); // 검색 버튼 활성화 상태
  const postsPerPage = 5;
  const navigate = useNavigate();

  const posts = getPosts();

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchText(''); // 카테고리 변경 시 검색어 초기화
    setCurrentPage(1); // 카테고리 변경 시 첫 페이지로 이동
    setIsSearchActive(false); // 검색 비활성화
  };

  const filteredAndSearchedPosts = posts.filter((post: Post) => {
    const categoryMatches =
      selectedCategory === '전체' || post.category === selectedCategory;
    const searchMatches = post.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return categoryMatches && (isSearchActive ? searchMatches : true);
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredAndSearchedPosts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (order: string) => {
    setSortOrder(order);
  };

  const onSearch = (value: string) => {
    setSearchText(value);
    setIsSearchActive(true);
  };

  const handlePostClick = (postId: number) => {
    navigate(`/qna/detail/${postId}`);
  };

  return (
    <div
      style={{
        width: '100%',
        paddingLeft: '15%',
        paddingRight: '15%',
        marginTop: '20px',
      }}
    >
      <h1
        style={{ fontSize: '23px', fontWeight: 'bold', marginBottom: '25px' }}
      >
        금융 Q&A
      </h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap:'20px',
          width:'100%'
        }}
      >
        <div style={{ width: '75%'}}>
          <div style={{ marginBottom: '25px' }}>
            <Category onSelectCategory={handleCategoryChange} />
          </div>
          <div style={{ marginBottom: '25px' }}>
            <HotPosts />
          </div>

          <div
            style={{
              marginBottom: '25px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Input.Search
              placeholder='검색어를 입력하세요.'
              allowClear
              onSearch={onSearch}
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              enterButton
              size='large'
              style={{ width: '80%' }}
            />
          </div>

          <div className='flex justify-end items-center'>
            <div
              className='flex space-x-3 items-end'
              style={{ fontSize: '13px', fontWeight: '300' }}
            >
              {['최근 답변순', '최신순', '인기순'].map((order) => (
                <button
                  key={order}
                  onClick={() => handleSortChange(order)}
                  style={{
                    fontWeight: sortOrder === order ? 'bold' : 'normal',
                    color: sortOrder === order ? 'black' : 'gray',
                  }}
                >
                  {order}
                </button>
              ))}
            </div>
          </div>

          <PostList
            posts={currentPosts}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            totalPosts={filteredAndSearchedPosts.length}
            onPageChange={handlePageChange}
            onPostClick={handlePostClick}
          />
        </div>

        <div style={{ width:'30%' }}>
          <PostRegisterButton />
        </div>
      </div>
    </div>
  );
};

export default Board;
