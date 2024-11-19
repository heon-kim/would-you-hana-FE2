import React from 'react';
import { Pagination } from 'antd';
import iconUser from '../assets/img/icon_user_board.jpg';
import { Post } from '../constants/posts';

interface PostListProps {
  posts: Post[];
  currentPage: number;
  postsPerPage: number;
  totalPosts: number;
  onPageChange: (page: number) => void;
  onPostClick: (postId: number) => void;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  currentPage,
  postsPerPage,
  totalPosts,
  onPageChange,
  onPostClick,
}) => {
  return (
    <>
      <ul className="divide-y divide-gray-300">
        {posts.map((post) => (
          <li
            key={post.id}
            className="py-5"
            onClick={() => onPostClick(post.id)}
          >
            <button className="text-start">
              <div>
                <p className="text-gray-500 mb-2" style={{ fontSize: '15px' }}>
                  {post.category}
                </p>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 mb-4" style={{ fontSize: '14px' }}>
                  <span className="text-mainColor">
                    조회 {post.counts.views}
                  </span>{' '}
                  · 도움돼요 {post.counts.likes} · 댓글 {post.counts.comments}
                  {post.answered ? <span className='text-hoverColor font-extrabold'> · 답변완료</span> : ''}
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
                    alt="iconUser"
                    width={25}
                    style={{ borderRadius: '50%' }}
                  />
                  <label className="ml-2 text-gray-500" style={{fontSize:'13px'}}>
                    {post.author}
                  </label>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <footer className="mt-6 flex justify-center">
        <Pagination
          current={currentPage}
          total={totalPosts}
          pageSize={postsPerPage}
          onChange={onPageChange}
        />
      </footer>
    </>
  );
};

export default PostList;
