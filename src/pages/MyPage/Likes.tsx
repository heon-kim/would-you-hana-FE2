import React, { useState } from 'react';
import { Pagination } from 'antd';
import iconUser from '../../assets/img/icon_user_board.jpg';
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
  const postsPerPage = 5; // 페이지당 표시할 게시물 수

  // 현재 페이지에 해당하는 게시물 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div
      style={{
        width: '100%',
        paddingLeft: '5%',
        paddingRight: '15%',
        marginTop: '5%',
      }}
    >
      <div style={{ marginBottom: '20px' }}>
      </div>
      <div
        style={{
          marginBottom: '20px', // HotPosts와 아래 내용 사이 간격 조절
        }}
      >
      <div style={{fontSize: '20px', fontWeight: 'bold'}}>좋아요</div>
      </div>
      <div className='flex justify-end items-center'>
        <div
          className='flex space-x-3 items-end text-gray-400'
          style={{ fontSize: '13px', fontWeight: '300' }}
        >
          <button>최근 답변순</button>
          <button>최신순</button>
          <button>인기순</button>
        </div>
      </div>
      <ul className='divide-y divide-gray-300'>
        {currentPosts.map((post) => (
          <li key={post.id} className='py-5'>
            <button className='text-start'>
              <div>
                <p className='text-gray-500 mb-2' style={{ fontSize: '15px' }}>
                  {post.category}
                </p>
                <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                  {post.title}
                </h3>
                <p className='text-gray-500 mb-4' style={{ fontSize: '12px' }}>
                  <span className='text-mainColor'>조회 {post.views}</span> ·
                  도움돼요 {post.likes} · 댓글 {post.comments}
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={iconUser}
                    alt='iconUser'
                    width={25}
                    style={{ borderRadius: '50%' }}
                  />
                  <label className='ml-2 text-xs text-gray-500'>
                    신제철차장
                  </label>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <footer className='mt-6 flex justify-center'>
        <Pagination
          current={currentPage}
          total={posts.length}
          pageSize={postsPerPage}
          onChange={handlePageChange}
        />
      </footer>
    </div>
  );
};

export default Likes;
