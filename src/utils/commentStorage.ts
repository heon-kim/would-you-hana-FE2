
const getComments = () : Comment[] => {
    const comments = localStorage.getItem('comments');
    return comments ? JSON.parse(comments) : [];
}

const saveComments = (comments : Comment[]) => {
    localStorage.setItem('comments', JSON.stringify(comments));
  };

// 포스트 삭제시 cascade하게 댓글도 전부 삭제
const deleteAllComments = (postId: string) => {
    const comments = getComments();
    console.log(comments);
    delete comments[Number(postId)];
    saveComments(comments);
  
    // // 포스트가 삭제되었으면 새로 저장
    // if (posts.length !== updatedPosts.length) {
    //   savePosts(updatedPosts);
    // } else {
    //   console.error('Post not found');
    // }
}
export {getComments, saveComments, deleteAllComments};