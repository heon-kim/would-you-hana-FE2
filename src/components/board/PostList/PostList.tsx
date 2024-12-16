import React from 'react';
import { Pagination } from 'antd';
import iconUser from '../../../assets/img/icon_user_board.jpg';
import { Post } from '../../../types/post';

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
            className="py-5 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => onPostClick(post.id)}
          >
            <div className="text-start">
              <p className="text-gray-500 mb-2 text-[15px]">
                {post.category}
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-500 mb-4 text-sm">
                <span className="text-mainColor">
                  조회 {post.counts.views}
                </span>
                <span className="mx-1">·</span>
                <span>도움돼요 {post.counts.likes}</span>
                <span className="mx-1">·</span>
                <span>댓글 {post.counts.comments}</span>
                {post.answered && (
                  <>
                    <span className="mx-1">·</span>
                    <span className="text-hoverColor font-extrabold">답변완료</span>
                  </>
                )}
              </p>
              <div className="flex items-center">
                <img
                  src={iconUser}
                  alt="User Avatar"
                  className="w-[25px] h-[25px] rounded-full"
                />
                <span className="ml-2 text-gray-500 text-[13px]">
                  {post.author}
                </span>
              </div>
            </div>
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