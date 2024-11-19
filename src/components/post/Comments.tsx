import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Input, Radio } from 'antd';
import { LikeOutlined, DownOutlined } from '@ant-design/icons';
import userIcon from '../../assets/img/icon_user.png';
import { relativeTime } from '../../utils/stringFormat';
import { findUser } from '../../utils/userStorage';
import { Comment, Reply } from '../../constants/posts';
import { findPost, updatePost } from '../../utils/postStorage';

const { TextArea } = Input;

const CommentForm: React.FC<{
  onSubmit: (content: string) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isAuthenticated : boolean;
}> = ({ onSubmit, value, onChange, isAuthenticated }) => (
  <form
    className="flex gap-2"
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit(value);
    }}
  >
    {isAuthenticated === true ? 
      <>
      <TextArea
      showCount
      autoSize
      maxLength={300}
      allowClear
      value={value}
      onChange={onChange}
      placeholder="댓글을 입력하세요"
      style={{alignItems:'center'}}
      />
      <Button size="large"  htmlType="submit">
        댓글 달기
      </Button>
      </>
       : 
       <>
       <TextArea
        showCount
        autoSize
        maxLength={300}
        allowClear
        disabled
        value={value}
        onChange={onChange}
        placeholder="로그인 후 댓글을 달아보세요."
      />
        <Button size="large"  htmlType="submit" disabled>
          댓글 달기
        </Button>
       </>}
    
    
  </form>
);

const ReplyInput: React.FC<{
  replyValue: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
}> = ({ replyValue, onChange, onSubmit }) => (
  <div className="flex gap-3 p-3">
    <div className="w-10" />
    <TextArea
      showCount
      autoSize
      maxLength={300}
      allowClear
      value={replyValue}
      onChange={onChange}
      placeholder="답글을 입력하세요"
    />
    <Button type="primary" onClick={onSubmit}>
      작성
    </Button>
  </div>
);

const CommentItem: React.FC<{
  comment: Comment;
  replies: Reply[];
  isReplying: boolean;
  showReplies: boolean;
  onToggleReply: () => void;
  onToggleShowReplies: () => void;
  onAddReply: (content: string) => void;
  replyContent: string;
  onChangeReplyContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onLike: () => void;
  isAuthenticated : boolean;
}> = ({
  comment,
  replies,
  isReplying,
  showReplies,
  onToggleReply,
  onToggleShowReplies,
  onAddReply,
  replyContent,
  onChangeReplyContent,
  onLike,
  isAuthenticated
}) => (
  <div className="comment__item border-b pb-3 border-gray-200">
    <div
      className={`comment__item--main flex gap-3 p-3 ${
        comment.certified ? 'bg-pointColor' : ''
      }`}
    >
      <img src={userIcon} alt="user icon" className="w-12 h-12" />
      <div className="flex flex-col gap-2">
        <div className="comment__author flex gap-3">
          <span>{comment.author}</span>
          {comment.certified && (
            <div className="bg-gray-300 rounded-full px-3 text-sm self-center">
              🎖️ 채택
            </div>
          )}
          <span className="self-center font-light text-xs">
            {relativeTime(+new Date(comment.createdAt))}
          </span>
        </div>
        <p className="comment__content font-light">{comment.content}</p>
        <div className="comment__btns flex">
          <Button
            icon={<LikeOutlined />}
            onClick={onLike}
            type="text"
            className={comment.liked ? 'text-mainColor' : ''}
          >
            {comment.likes}
          </Button>
          {isAuthenticated && (
            <Button type="text" onClick={onToggleReply}>
            {isReplying ? '취소' : '답글쓰기'}
          </Button>)}
        </div>
        {replies.length > 0 && (
          <div
            className="comment__toggle text-xs flex gap-3 hover:cursor-pointer hover:text-mainColor"
            onClick={onToggleShowReplies}
          >
            <DownOutlined />
            <span>
              {showReplies ? '숨기기' : `${replies.length} 개의 답글`}
            </span>
          </div>
        )}
      </div>
    </div>
    {isReplying && (
      <ReplyInput
        replyValue={replyContent}
        onChange={onChangeReplyContent}
        onSubmit={() => onAddReply(replyContent)}
      />
    )}
    {showReplies && replies.length > 0 && (
      <div className="comment__item--reply flex flex-col gap-3 p-3">
        {replies.map((reply) => (
          <div key={reply.id} className="flex gap-3">
            <div className="w-10" />
            <img src={userIcon} alt="user icon" className="w-12 h-12" />
            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <span>{reply.author}</span>
                <span className="self-center font-light text-xs">
                  {relativeTime(+new Date(reply.createdAt))}
                </span>
              </div>
              <p className="font-light">{reply.content}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const Comments: React.FC<{isAuthenticated : boolean}> = ({isAuthenticated}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [replies, setReplies] = useState<{
    [key: number]: { [key: number]: Reply[] };
  }>({});
  const [newComment, setNewComment] = useState<string>('');
  const [replyContent, setReplyContent] = useState<{ [key: number]: string }>(
    {}
  );
  const [showReplies, setShowReplies] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [isReplying, setIsReplying] = useState<{ [key: number]: boolean }>({});
  const [sortBy, setSortBy] = useState<'latest' | 'likes'>('latest');

  const { postId: stringPostId } = useParams<{ postId: string }>();
  const postId: number = Number(stringPostId);

  useEffect(() => {
    const storedComments = localStorage.getItem('comments');
    const storedReplies = localStorage.getItem('replies');
    console.log(isAuthenticated);

    const allComments = storedComments ? JSON.parse(storedComments) : {};
    const postComments = allComments[postId] || [];
    setComments(postComments);

    const allReplies = storedReplies ? JSON.parse(storedReplies) : {};
    const postReplies = allReplies[postId] || {};
    setReplies(postReplies);
  }, [postId]);

  const saveCommentsToLocalStorage = (updatedComments: Comment[]) => {
    const storedComments = localStorage.getItem('comments');
    const allComments = storedComments ? JSON.parse(storedComments) : {};
    allComments[postId] = updatedComments;
    localStorage.setItem('comments', JSON.stringify(allComments));
    const post = findPost(Number(postId));
    updateCommentCount(post, updatedComments);
  };

  // 댓글 개수 업데이트 함수
  const updateCommentCount = (post: Post, updatedComments: Comment[]) => {
    if (post) {
      const updatedPost = {
        ...post,
        counts: {
          ...post.counts,
          comments: updatedComments.length, // views 증가
        },
      };
      // 로컬 스토리지에 저장된 post 데이터 업데이트
      updatePost(updatedPost);
    }
  };

  const saveRepliesToLocalStorage = (updatedReplies: {
    [key: number]: { [key: number]: Reply[] };
  }) => {
    const storedReplies = localStorage.getItem('replies');
    const allReplies = storedReplies ? JSON.parse(storedReplies) : {};
    allReplies[postId] = updatedReplies;
    localStorage.setItem('replies', JSON.stringify(allReplies));
  };

  const loggedUser = localStorage.getItem('userEmail') || '';
  const userNickname = findUser(loggedUser)?.nickname || '';

  const addComment = () => {
    if (newComment.trim()) {
      const newCommentData: Comment = {
        id: Date.now(),
        author: userNickname,
        authorEmail: loggedUser,
        content: newComment,
        createdAt: new Date().toISOString(),
        certified: false,
        likes: 0,
        liked: false,
      };
      const updatedComments = [...comments, newCommentData];
      setComments(updatedComments);
      saveCommentsToLocalStorage(updatedComments);
      setNewComment('');
    }
  };

  const addReply = (commentId: number) => {
    const content = replyContent[commentId];
    if (content?.trim()) {
      const newReply: Reply = {
        id: Date.now(),
        author: userNickname,
        authorEmail: loggedUser,
        content,
        createdAt: new Date().toISOString(),
      };

      setReplies((prev) => {
        const updatedReplies = {
          ...prev,
          [commentId]: {
            ...(prev[commentId] || {}),
            [postId]: [...(prev[commentId]?.[postId] || []), newReply],
          },
        };
        saveRepliesToLocalStorage(updatedReplies);
        return updatedReplies;
      });

      setReplyContent((prev) => ({ ...prev, [commentId]: '' }));
      setIsReplying((prev) => ({ ...prev, [commentId]: false }));
    }
  };

  const likeComment = (commentId: number) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
              liked: !comment.liked,
            }
          : comment
      )
    );
    saveCommentsToLocalStorage(comments);
  };

  const toggleReplies = (commentId: number) => {
    setShowReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const toggleReplying = (commentId: number) => {
    setIsReplying((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const sortedComments = () => {
    return [...comments].sort((a, b) =>
      sortBy === 'likes'
        ? b.likes - a.likes
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  return (  
    <div className="comment flex flex-col gap-7">
      <CommentForm
        onSubmit={addComment}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        isAuthenticated={isAuthenticated}
      />
      <div className="mt-3 flex justify-between">
        <span>{comments.length}개의 댓글</span>
        {comments.length > 0 && (
          <Radio.Group
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex justify-end"
            optionType="button"
          >
            <Radio value="latest">최신순</Radio>
            <Radio value="likes">좋아요순</Radio>
          </Radio.Group>
        )}
      </div>
      
      <div className="comment__list flex flex-col gap-1">
        {sortedComments().map((comment: Comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            replies={replies[comment.id]?.[postId] || []}
            isReplying={isReplying[comment.id]}
            showReplies={showReplies[comment.id]}
            onToggleReply={() => toggleReplying(comment.id)}
            onToggleShowReplies={() => toggleReplies(comment.id)}
            onAddReply={() => addReply(comment.id)}
            replyContent={replyContent[comment.id] || ''}
            onChangeReplyContent={(e) =>
              setReplyContent((prev) => ({
                ...prev,
                [comment.id]: e.target.value,
              }))
            }
            onLike={() => likeComment(comment.id)}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
