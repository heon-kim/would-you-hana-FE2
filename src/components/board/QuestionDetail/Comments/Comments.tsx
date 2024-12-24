import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { LikeOutlined, ClockCircleOutlined } from '@ant-design/icons';
import userIcon from '../../../../assets/img/icon_user.png';
import { relativeTime } from '../../../../utils/stringFormat';
import { CommentDTO } from '../../../../types/dto/comment.dto';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../hoc/store';
import { qnaService } from '../../../../services/qna.service';
import { useParams } from 'react-router-dom';
import { communityService } from '../../../../services/community.service';

const { TextArea } = Input;

const CommentForm: React.FC<{
  onSubmit: (content: string) => void;
  newComment: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ onSubmit, newComment, onChange }) => {

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    return (
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(newComment);
        }}
      >
        <TextArea
          showCount
          autoSize
          maxLength={300}
          allowClear
          value={newComment}
          onChange={onChange}
          disabled={!isAuthenticated}
          placeholder={isAuthenticated ? "댓글을 입력하세요" : "로그인 후 댓글을 달아보세요."}
          style={{ alignItems: 'center' }}
        />
        <Button size="large" htmlType="submit">
          댓글 달기
        </Button>
      </form>
    );
  }

const CommentItem: React.FC<{
  comment: CommentDTO;
}> = ({
  comment,
}) => (
    <div className="comment__item border-b pb-3 border-gray-200">
      <div
        className={`comment__item--main flex gap-3 p-3 `}
      >
        <img src={userIcon} alt="user icon" className="w-12 h-12" />
        <div className="flex flex-col gap-2">
          <div className="comment__author flex gap-3">
            <span>{comment.nickname}</span>
          </div>
          <p className="comment__content font-light">{comment.content}</p>
          <div className='flex gap-3'>
          <span className="self-center font-light text-xs flex gap-1">
              <ClockCircleOutlined />
              {relativeTime(+new Date(comment.createdAt))}
            </span>
            <span className="self-center font-light text-xs flex gap-1"><LikeOutlined />좋아요 1</span>
          </div>
        </div>
      </div>
    </div>
  );

const Comments: React.FC<{ type:String, commentList: CommentDTO[] }> = ({ type, commentList }) => {
  const [comments, setComments] = useState<CommentDTO[]>(commentList);
  const [newComment, setNewComment] = useState<string>('');
  const { postId } = useParams<{ postId: string }>();
  const { userId } = useSelector((state: RootState) => state.auth);


  const addComment = async () => {
    const service = type === 'post' ? communityService : qnaService;
    const response = await service.addComment(Number(postId), {
      customerId: Number(userId),
      content: newComment
    });
    setComments(comments => [...comments, { ...response.data, customerId: Number(userId) }]);
  };
  

  return (
    <div className="comment flex flex-col gap-7">
      {/* 댓글 입력창 */}
      <CommentForm
        onSubmit={addComment}
        newComment={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      {/* 댓글 리스트 */}
      <div className="comment__list flex flex-col gap-1">
        {comments.map((comment: CommentDTO) => (
          <CommentItem
            key={comment.id}
            comment={comment}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;