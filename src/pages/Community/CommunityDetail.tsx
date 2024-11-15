import React, { useEffect, useState } from 'react';
import { Button, message, Input } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { StarOutlined } from '@ant-design/icons';
import { LikeOutlined, DownOutlined, MessageOutlined } from '@ant-design/icons';
import { relativeTime } from '../../utils/stringFormat';

import ImgBank from '../../assets/img/img_community3.jpg';
// import ImgBank2 from '../../assets/img/img_community2.png';
import userIcon from '../../assets/img/icon_user.png';

const { TextArea } = Input;

const CommentForm: React.FC<{
  onSubmit: (content: string) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ onSubmit, value, onChange }) => (
  <form
    className="flex gap-1"
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit(value);
    }}
  >
    <TextArea
      showCount
      autoSize
      maxLength={300}
      allowClear
      value={value}
      onChange={onChange}
      placeholder="댓글을 입력하세요"
    />
    <Button size="large" type="primary" htmlType="submit">
      댓글 달기
    </Button>
  </form>
);

interface Comment {
  id: number;
  author: string;
  content: string;
  // likes: number;
  /**좋아요 수 추가해야 함. */
  replies: Comment[]; // 대댓글을 포함하는 배열
}

interface DataType {
  id: number; // 각 포스트에 id 추가
  category: string;
  title: string;
  content: string;
  author: string;
  views: number;
  likes: number;
  scraps: number;
  image: boolean;
  comments: Comment[];
  /**작성 날짜도 추가해야 함. */
}

const CommunityData: DataType[] = [
  {
    id: 0,
    category: '금융',
    title: '광진구에서 계좌 개설 어디가 좋을까요?',
    content:
      '광진구 근처에서 계좌 개설할 수 있는 은행 추천 부탁드려요. 새로 시작하는 이자 높은 상품 있으면 알려주세요.',
    author: '김둘리',
    views: 27,
    likes: 8,
    scraps: 8,
    image: true,
    comments: [
      {
        id: 1,
        author: '홍길동',
        content: '저는 광진구 00은행 추천드려요. 이자도 괜찮고요!',
        replies: [
          {
            id: 2,
            author: '김하나',
            content: '그럼 그 은행 추천해주신 이유가 무엇인가요?',
            replies: [],
          },
        ],
      },
      {
        id: 3,
        author: '이철수',
        content: '광진구 00은행도 괜찮았어요. 하지만 상담이 조금 느렸어요.',
        replies: [],
      },
    ],
  },
  {
      id: 1,
    category: '소비',
    title: '광진구에서 저렴한 카페 추천 좀!',
    content:
      '광진구에서 분위기 좋고 가격도 괜찮은 카페 찾고 있어요. 추천해 주세요!',
    author: '안창살김하나',
    views: 16,
    likes: 3,
    scraps: 5,
    image: false,
    comments: [
      {
        id: 1,
        author: '박소연',
        content: '저는 00카페 추천합니다. 가격도 저렴하고 분위기도 좋아요.',
        replies: [
          {
            id: 2,
            author: '김상태',
            content: '00카페는 좌석이 좀 좁아요. 참고해주세요!',
            replies: [],
          },
        ],
      },
    ],
  },
  {
      id: 2,
    category: '주식',
    title: '광진구 사람들 주식 어디서 많이 하나요?',
    content:
      '광진구 사는 분들 주식 투자할 때 주로 사용하는 앱이나 플랫폼 뭐예요? 추천 좀 해주세요.',
    author: '나폴리맛피자',
    views: 15,
    likes: 6,
    scraps: 2,
    image: true,
    comments: [
      {
        id: 1,
        author: '주식왕',
        content: '저는 00주식 앱을 자주 사용해요. 여러 종목도 잘 나오고 편해요.',
        replies: [],
      },
      {
        id: 2,
        author: '이진호',
        content: '저는 00플랫폼 사용 중인데, 기본적인 기능은 괜찮습니다.',
        replies: [],
      },
    ],
  },
  {
      id: 3,
    category: '대출',
    title: '광진구에서 학자금 대출 받기 쉬운 곳?',
    content:
      '대학생인데 학자금 대출 받으려는데 광진구 근처에서 상담 잘 해주는 곳 있나요?',
    author: '광진고릴라',
    views: 15,
    likes: 2,
    scraps: 4,
    image: false,
    comments: [
      {
        id: 1,
        author: '대출왕',
        content: '00은행에서 상담을 받았는데 괜찮았습니다. 상담도 잘 해주셨어요.',
        replies: [],
      },
      {
        id: 2,
        author: '한지민',
        content: '00은행은 절차가 좀 복잡했어요. 신중하게 결정하세요.',
        replies: [],
      },
    ],
  },
  {
      id: 4,
    category: '소비',
    title: '광진구 배달 맛집 리스트 좀!',
    content:
      '광진구에서 배달 맛집 추천 부탁드려요. 혼밥하기 좋은 곳도 알려주시면 감사!',
    author: '광진구오함마',
    views: 9,
    likes: 3,
    scraps: 6,
    image: false,
    comments: [
      {
        id: 1,
        author: '배달왕',
        content: '저는 00배달 음식 추천합니다! 가성비 좋고 맛있어요.',
        replies: [
          {
            id: 2,
            author: '김상태',
            content: '배달이 빠르고 친절한 서비스가 좋아요.',
            replies: [],
          },
        ],
      },
    ],
  },
  {
      id: 5,
    category: '금융',
    title: '광진구에서 적금 상품 괜찮은 곳?',
    content: '광진구 근처에 이율 높은 적금 상품 있는 은행 추천 부탁드려요.',
    author: '금융핑',
    views: 9,
    likes: 6,
    scraps: 8,
    image: true,
    comments: [
      {
        id: 1,
        author: '금융대장',
        content: '00은행에서 이율 높은 상품 있었어요. 잘 되어 있었네요.',
        replies: [],
      },
    ],
  },
  {
      id: 6,
    category: '주식',
    title: '광진구 근처 주식 강의 듣고 싶어요',
    content: '주식 공부하고 싶은데 광진구 근처에 주식 강의 해주는 곳 있을까요?',
    author: '밥플러스최고',
    views: 17,
    likes: 7,
    scraps: 2,
    image: false,
    comments: [
      {
        id: 1,
        author: '주식학개론',
        content: '광진구에 00주식학원이 좋다고 들었어요. 한번 가보세요.',
        replies: [],
      },
    ],
  },
  {
      id: 7,
    category: '대출',
    title: '광진구에서 대출 금리 낮은 곳 추천',
    content: '신용 대출 받으려고 하는데 광진구 근처 금리 낮은 은행 있나요?',
    author: '우주우주',
    views: 17,
    likes: 3,
    scraps: 8,
    image: false,
    comments: [
      {
        id: 1,
        author: '대출마스터',
        content: '00은행 추천드려요! 금리가 저렴하고 조건도 괜찮아요.',
        replies: [],
      },
    ],
  },
  {
      id: 8,
    category: '대출',
    title: '광진구에서 대출 금리 낮은 곳 추천',
    content: '신용 대출 받으려고 하는데 광진구 근처 금리 낮은 은행 있나요?',
    author: '호이호이',
    views: 17,
    likes: 3,
    scraps: 2,
    image: false,
    comments: [],
  },
  {
      id: 9,
    category: '소비',
    title: '광진구 데이트하기 좋은 카페',
    content:
      '분위기 좋은 카페 찾고 있어요. 광진구에서 괜찮은 곳 추천 좀 부탁드립니다!',
    author: '빙화만두',
    views: 17,
    likes: 3,
    scraps: 8,
    image: false,
    comments: [
      {
        id: 1,
        author: '데이트왕',
        content: '00카페 추천드립니다. 분위기 좋고 데이트하기 딱이에요!',
        replies: [],
      },
    ],
  },
  {
      id: 10,
    category: '금융',
    title: '광진구 주택청약 정보 좀 알려주세요',
    content:
      '광진구 거주 중인데 주택청약 알아보고 있어요. 정보 공유 부탁드립니다.',
    author: '홍시',
    views: 17,
    likes: 3,
    scraps: 8,
    image: false,
    comments: [
      {
        id: 1,
        author: '청약왕',
        content: '광진구 청약에 대한 정보는 00청약사무소에서 문의하시면 좋아요.',
        replies: [],
      },
    ],
  },
];


const CommunityDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<DataType | null>(null);
  const [repliesVisible, setRepliesVisible] = useState<{ [key: number]: boolean }>({});
  const [replyFormVisible, setReplyFormVisible] = useState<{ [key: number]: boolean }>({}); // 답글 작성 폼 보이기/숨기기 상태
  const [commentContent, setCommentContent] = useState<string>(''); // 댓글 입력 상태
  const [replyContent, setReplyContent] = useState<{ [key: number]: string }>({}); // 각 댓글에 대한 답글 입력 상태

  useEffect(() => {
    if (!postId) {
      message.error('질문 ID가 없습니다.');
      navigate('/404');
    } else {
      //const foundPost = JSON.parse(localStorage.getItem('community_posts'));
      const foundPost = CommunityData.find((data) => data.id === parseInt(postId));
      if (!foundPost) {
        message.error('질문을 찾을 수 없습니다.');
        navigate('/404');
      } else {
        setPost(foundPost);
      }
    }
  }, [postId, navigate]);

  const handleToggleReplies = (commentId: number) => {
    setRepliesVisible((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>, commentId: number) => {
    setReplyContent((prev) => ({
      ...prev,
      [commentId]: e.target.value,
    }));
  };

  const handleCommentSubmit = (content: string) => {
    if (post) {
      const newComment: Comment = {
        id: post.comments.length + 1,
        author: '새로운 사용자', // 실제 사용자 이름으로 바꿔야 할 부분
        content,
        replies: [],
      };
      const updatedPost = { ...post, comments: [...post.comments, newComment] };
      setPost(updatedPost);
      setCommentContent(''); // 입력 필드 초기화
    }
  };

  const handleReplyFormToggle = (commentId: number) => {
    setReplyFormVisible((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleReplySubmit = (commentId: number, content: string) => {
    if (post) {
      const updatedComments = post.comments.map((comment) => {
        if (comment.id === commentId) {
          const newReply: Comment = {
            id: comment.replies.length + 1,
            author: '새로운 사용자', // 실제 사용자 이름으로 바꿔야 할 부분
            content,
            replies: [],
          };
          return { ...comment, replies: [...comment.replies, newReply] };
        }
        return comment;
      });
      const updatedPost = { ...post, comments: updatedComments };
      setPost(updatedPost);
      setReplyContent((prev) => ({ ...prev, [commentId]: '' })); // 답글 필드 초기화
    }
  };

  if (!post) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
        width: '100%',
        paddingLeft: '15%',
        paddingRight: '15%',
        paddingTop: '40px',
        paddingBottom: '20px',
      }}
    >
      <div className="flex w-full justify-center" style={{ gap: '20px' }}>
        <div className="article flex flex-col gap-6 w-full" style={{ width: '75%' }}>
          <div className="question flex flex-col gap-6 font-light pb-3 border-b border-gray-200">
            <div className="question__header flex flex-col gap-3">
              <h1
                style={{
                  color: 'black',
                  fontSize: '30px',
                  lineHeight: '1.2',
                  fontWeight: 'bold',
                }}
              >
                Q. {post.title}
              </h1>
              <div className="flex gap-4 text-xs text-gray-400">
                <span>{post.author}</span>
                <span>조회 {post.views || 0}</span>
                {/* <span>좋아요 {post.likes || 0}</span> */}
                <span>스크랩 {post.scraps || 0}</span>
              </div>
              <div className="flex justify-end gap-4">
                <Button icon={<StarOutlined />}>스크랩</Button>
              </div>
            </div>
            <div className="w-full">
              <p>{post.content}</p>
              {/* 조건부로 이미지를 표시 */}               
              {post.image && <img src={ImgBank} alt="Post Image" style={{ width: '80%', marginTop: '20px' }} />}
            </div>
            <div className="post__footer text-gray-400">
              <span>{'2024-11-06'}</span>
              <span className="ml-4">
                <LikeOutlined /> {post.likes || 0}  {/* 좋아요 수 */}
              </span>
              <span className="ml-4">
                <MessageOutlined /> {post.comments.length || 0}  {/* 댓글 수 */}
              </span>
            </div>
          </div>
          {/* 댓글 작성 폼 추가 */}
          <CommentForm
              value={commentContent}
              onChange={handleCommentChange}
              onSubmit={handleCommentSubmit}
            />
          {/* 댓글 및 대댓글 */}
          <div className="comments-section" style={{ marginTop: '40px' }}>
            {post.comments.map((comment) => (
              <div
                key={comment.id}
                className="comment__item"
                style={{
                  borderBottom: '1px solid #e0e0e0',
                  paddingBottom: '20px',
                  marginBottom: '20px',
                }}
              >
                <div className="comment__item--main" style={{ display: 'flex', gap: '16px' }}>
                  <img src={userIcon} alt="user icon" className="w-12 h-12 rounded-full" />
                  <div className="flex flex-col gap-2" style={{ flex: 1 }}>
                    <div className="comment__author" style={{ display: 'flex', gap: '8px' }}>
                      <span>{comment.author}</span>
                      <span className="self-center font-light text-xs">
                        {relativeTime(+new Date())}
                      </span>
                    </div>
                    <p className="comment__content" style={{ fontSize: '14px', color: '#333' }}>
                      {comment.content}
                    </p>
                    <div className="comment__btns" style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                      <Button icon={<LikeOutlined />} style={{ border: 'none' }} >{post.likes}</Button>
                      <Button onClick={() => handleReplyFormToggle(comment.id)} style={{ border: 'none' }}>답글쓰기</Button>
                    </div>
                    {comment.replies.length > 0 && (
                      <div
                        className="comment__toggle text-xs"
                        onClick={() => handleToggleReplies(comment.id)}
                        style={{
                          display: 'flex',
                          gap: '8px',
                          cursor: 'pointer',
                          marginTop: '10px',
                          color: '#999',
                        }}
                      >
                        <DownOutlined />
                        <span>{repliesVisible[comment.id] ? '숨기기' : `${comment.replies.length} 개의 답글 보기`}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 답글 작성 폼 */}
                {replyFormVisible[comment.id] && (
                      <div className="flex gap-3 p-3">
                        <div className="w-10" />
                        <TextArea
                          showCount
                          value={replyContent[comment.id] || ''}
                          onChange={(e) => handleReplyChange(e, comment.id)}
                          placeholder="답글을 작성하세요"
                          autoSize
                          maxLength={300}
                        />
                        <Button
                          type="primary"
                          onClick={() => handleReplySubmit(comment.id, replyContent[comment.id])}
                        >
                          작성
                        </Button>
                      </div>
                    )}

                {/* 대댓글 */}
                {repliesVisible[comment.id] && comment.replies.length > 0 && (
                  <div className="comment__item--reply" style={{ marginTop: '20px' }}>
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3" style={{ marginBottom: '12px' }}>
                        <div className="w-10" />
                        <img src={userIcon} alt="user icon" className="w-12 h-12 rounded-full" />
                        <div className="flex flex-col gap-2" style={{ flex: 1 }}>
                          <div className="comment__author" style={{ display: 'flex', gap: '8px' }}>
                            <span>{reply.author}</span>
                            <span className="self-center font-light text-xs">{relativeTime(+new Date())}</span>
                          </div>
                          <p className="comment__content" style={{ fontSize: '14px', color: '#333' }}>
                            {reply.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;





