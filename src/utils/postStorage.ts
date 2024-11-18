import { Post } from '../constants/posts';

const LOCAL_STORAGE_KEY = 'posts';

const getPosts = (): Post[] => {
  const posts = localStorage.getItem(LOCAL_STORAGE_KEY);
  return posts ? JSON.parse(posts) : [];
};

const getPostsByNickname = (nickname : string) : Post[] => {
  const posts = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!posts) {
    return [];
  }
  const parsedPosts: Post[] = JSON.parse(posts);
  
  // nickname이 특정 값인 post만 필터링
  return parsedPosts.filter(post => post.nickname === nickname);
}

const postCount = () => {
  const posts = getPosts();
  return posts?.length || 0;
};

const savePosts = (posts: Post[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
};

const postExists = (id: number) => {
  return getPosts().some((post) => post.id === id);
};

const findPost = (id: number) => {
  return getPosts().find((post) => post.id === id);
};

const savePost = (post: Post) => {
  if (!postExists(post.id)) {
    const posts = getPosts();
    posts.push(post);
    savePosts(posts);
  }
};

const updatePost = (post: Post) => {
  const posts = getPosts();
  const index = posts.findIndex((u) => u.id === post.id);

  if (index !== -1) {
    posts[index] = post;
    savePosts(posts);
  } else {
    console.error('Post not found');
  }
};

// export function updatePost(post: Post) {
//   const posts = JSON.parse(localStorage.getItem('posts') || '[]');
//   const index = posts.findIndex((u) => u.id === post.id);

//   if (index > -1) {
//     posts[index] = post; // 기존 post를 업데이트
//     localStorage.setItem('posts', JSON.stringify(posts)); // 로컬 스토리지에 업데이트된 posts 저장
//   }
// }

export { getPosts, getPostsByNickname, savePost, findPost, updatePost, postCount };
