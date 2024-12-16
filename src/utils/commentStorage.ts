import { Comment } from '../types/comment';

const getComments = (postId: number): Comment[] => {
  const comments = localStorage.getItem('comments');
  const allComments = comments ? JSON.parse(comments) : {};
  return allComments[postId] || [];
};

const saveComment = (comment: Comment) => {
  const comments = localStorage.getItem('comments');
  const allComments = comments ? JSON.parse(comments) : {};
  
  if (!allComments[comment.postId]) {
    allComments[comment.postId] = [];
  }
  
  allComments[comment.postId].push(comment);
  localStorage.setItem('comments', JSON.stringify(allComments));
};

const deleteComment = (commentId: number) => {
  const comments = localStorage.getItem('comments');
  if (!comments) return;

  const allComments = JSON.parse(comments);
  
  // 모든 게시글의 댓글 목록을 순회하며 해당 commentId를 찾아 삭제
  Object.keys(allComments).forEach(postId => {
    allComments[postId] = allComments[postId].filter(
      (comment: Comment) => comment.id !== commentId
    );
  });

  localStorage.setItem('comments', JSON.stringify(allComments));
};

const deleteAllComments = (postId: number) => {
  const comments = localStorage.getItem('comments');
  if (!comments) return;

  const allComments = JSON.parse(comments);
  delete allComments[postId];
  localStorage.setItem('comments', JSON.stringify(allComments));
};

export { getComments, saveComment, deleteComment, deleteAllComments };