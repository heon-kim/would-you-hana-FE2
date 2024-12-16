import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import HotPosts from '../../components/board/HotPosts/HotPosts';
import Category from '../../components/board/Category/Category';
import PostList from '../../components/board/PostList/PostList';
import PostRegisterButton from '../../components/board/PostRegisterButton/PostRegisterButton';
import BankerList from '../../components/board/BankerList/BankerList';
import SearchBar from '../../components/board/SearchBar/SearchBar';
import SortButtons from '../../components/board/SortButtons/SortButtons';
import { getPosts } from '../../utils/postStorage';
import { Post } from '../../types/post';

const POSTS_PER_PAGE = 5;

const Board: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [sortOrder, setSortOrder] = useState<string>('최근 답변순');
  const [searchText, setSearchText] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const posts = getPosts();

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setSearchText('');
    setCurrentPage(1);
    setIsSearchActive(false);
  }, []);

  const handleSearch = useCallback((value: string) => {
    setSearchText(value);
    setIsSearchActive(true);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchText(value);
  }, []);

  const handleSortChange = useCallback((order: string) => {
    setSortOrder(order);
  }, []);

  const handlePostClick = useCallback((postId: number) => {
    navigate(`/qna/detail/${postId}`);
  }, [navigate]);

  const filteredAndSearchedPosts = posts.filter((post: Post) => {
    const categoryMatches =
      selectedCategory === '전체' || post.category === selectedCategory;
    const searchMatches = post.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return categoryMatches && (isSearchActive ? searchMatches : true);
  });

  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = filteredAndSearchedPosts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  return (
    <div className="w-full px-[15%] py-5">
      <h1 className="text-2xl font-bold mb-6">금융 Q&A</h1>

      <div className="flex flex-row gap-5 w-full">
        <div className="w-3/4">
          <div className="mb-6">
            <Category onSelectCategory={handleCategoryChange} />
          </div>
          
          <div className="mb-6">
            <HotPosts />
          </div>

          <SearchBar
            searchText={searchText}
            onSearch={handleSearch}
            onChange={handleSearchChange}
          />

          <SortButtons
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
          />

          <PostList
            posts={currentPosts}
            currentPage={currentPage}
            postsPerPage={POSTS_PER_PAGE}
            totalPosts={filteredAndSearchedPosts.length}
            onPageChange={setCurrentPage}
            onPostClick={handlePostClick}
          />
        </div>

        <div className="w-1/4 flex flex-col gap-6">
          <PostRegisterButton />
          <BankerList />
        </div>
      </div>
    </div>
  );
};

export default Board;
