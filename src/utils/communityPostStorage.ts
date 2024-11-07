import { Post } from '../constants/posts';

const LOCAL_STORAGE_KEY = 'community_posts';

// 로컬 스토리지에서 게시글 가져오기
export const getCommunityPosts = (): Post[] => {
  const savedPosts = localStorage.getItem(LOCAL_STORAGE_KEY);
  return savedPosts ? JSON.parse(savedPosts) : [];
};

// 로컬 스토리지에 게시글 저장하기
export const saveCommunityPost = (post: Post) => {
  const posts = getCommunityPosts();
  posts.push(post);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
};

// 게시글 ID를 위한 현재 게시글 수 가져오기
export const communityPostCount = (): number => {
  const posts = getCommunityPosts();
  return posts.length;
};
