import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useHistory import 추가
// import { Pagination, Input } from 'antd';
import HotPosts from '../../components/HotPost';
import Category from '../../components/Category';
import PostList from '../../components/PostList';
import { Input } from 'antd';
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
    category: '전자금융',
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
    category: '이체',
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
    category: '자산관리',
  },
];

const Board: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [sortOrder, setSortOrder] = useState<string>('최근 답변순');
  const [searchText, setSearchText] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false); // 검색 버튼 활성화 상태
  const postsPerPage = 5;
  const navigate = useNavigate();

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchText(''); // 카테고리 변경 시 검색어 초기화
    setCurrentPage(1); // 카테고리 변경 시 첫 페이지로 이동
    setIsSearchActive(false); // 검색 비활성화
  };

  const filteredAndSearchedPosts = posts.filter((post) => {
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
    navigate(`/qna/detail/${postId}`); // 특정 포스트 ID로 페이지 이동
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
          placeholder="검색어를 입력하세요."
          allowClear
          onSearch={onSearch}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          enterButton
          size="large"
          style={{ width: '80%' }}
        />
      </div>

      <div className="flex justify-end items-center">
        <div
          className="flex space-x-3 items-end"
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
  );
};

export default Board;