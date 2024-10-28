import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Input, message } from 'antd';
import { StarOutlined, HomeOutlined, PhoneOutlined } from '@ant-design/icons';
import { findPost } from '../../utils/postStorage';
import userIcon from '../../assets/img/icon_user.png';
import '../../App.css';
import PostRegisterButton from '../../components/PostRegisterButton';

const { TextArea } = Input;

const elapsedTime = (date: number): string => {
  const start = new Date(date);
  const seconds = Math.floor((Date.now() - start.getTime()) / 1000);

  if (seconds < 60) return '방금 전';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}분 전`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}시간 전`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}일 전`;

  return start.toLocaleDateString();
};

const QuestionDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!postId) {
      message.error('질문 ID가 없습니다.');
      navigate('/404');
    } else {
      const post = findPost(Number(postId));
      if (!post) {
        message.error('질문을 찾을 수 없습니다.');
        navigate('/404');
      }
    }
  }, [postId, navigate]);

  const post = postId ? findPost(Number(postId)) : null;

  if (!post) return null; // post가 없으면 아무것도 렌더링하지 않음

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
        alignSelf: 'center',
        paddingTop: '40px',
        paddingBottom: '20px'
      }}
    >
      <div className="flex w-full" style={{gap:'20px'}}>
      <div className="article flex flex-col gap-6 w-full" style={{width:'75%'}}>
        <div className="question flex flex-col gap-6 font-light">
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
              <span>조회 {post.counts.views || 0}</span>
              <span>좋아요 {post.counts.likes || 0}</span>
              <span>스크랩 {post.counts.scraps || 0}</span>
            </div>
            <div className="flex justify-end gap-4">
              <Button icon={<StarOutlined />}>스크랩</Button>
            </div>
          </div>
          <div className="w-full">
            <p>{post.content}</p>
          </div>
          <div className="post__footer text-gray-400">
            <span>{elapsedTime(+new Date(post.createdAt))}</span>
          </div>
        </div>
        <div className="answer flex flex-col border rounded shadow-md">
          <h1 className="p-5 font-bold bg-pointColor">
            하나은행 성동구 성수역 지점 홍창기 대리의 답변
          </h1>
          <div className="p-5 flex flex-col gap-5">
            <div className="comment__header flex justify-between font-light border-b pb-5">
              <div className="flex gap-3">
                <img src={userIcon} alt="user icon" className="w-12 h-12" />
                <div>
                  <div className="flex gap-3">
                    <span>홍창기 대리</span>
                    <div className="bg-gray-300 rounded-full px-3 text-sm self-center">
                      🎖️ 행원
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs">
                    #금융인증서 #주택청약
                  </span>
                </div>
              </div>
              <div className="flex gap-5">
                <Button icon={<HomeOutlined />} />
                <Button icon={<PhoneOutlined />} />
              </div>
            </div>
            <p className="comment__body font-light">
              안녕하세요,
              <br /> 하나은행 성동구 성수역 지점에 근무하고 있는 홍창기
              대리입니다.
              <br />
              <br />
              클라우드에 이미 등록된 기기에서는 해외에서도 금융인증서비스를
              이용할 수 있습니다. 고객님의 고민 해결에 도움이 되셨기를 바랍니다.
              <br />
              <br />
              감사합니다.
            </p>
            <div className="comment__footer font-light flex flex-col gap-5">
              <p className="text-xs text-gray-400">1일 전</p>
              <div className="flex justify-between">
                <Button>👍 도움돼요</Button>
                <Button>🔗 공유</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="comment flex flex-col gap-7">
          <Button block>댓글 (2)</Button>
          <form className="flex gap-1">
            <TextArea
              showCount
              autoSize
              maxLength={300}
              allowClear
              // onChange={onChange}
              placeholder="댓글을 입력하세요"
            />
            <Button size="large">댓글 달기</Button>
          </form>
          <div className="comment__list">
            <div className="comment__list__item">
              <div className="comment__list__item__main flex gap-3 p-3 bg-pointColor">
                <img src={userIcon} alt="user icon" className="w-12 h-12" />
                <div className="flex flex-col gap-2">
                  <div className="flex gap-3 ">
                    <span>박석민</span>
                    <div className="bg-gray-300 rounded-full px-3 text-sm self-center">
                      🎖️ 채택
                    </div>
                  </div>
                  <p>
                    현지 유심을 이용하는 경우에는 인증서를 이용할 수 없다는 점
                    알고 계시면 좋을 것 같습니다.
                  </p>
                </div>
              </div>

              <div className="comment__list__item__sub flex gap-3 p-3">
                <div className="w-10"></div>
                <img src={userIcon} alt="user icon" className="w-12 h-12" />
                <div className="flex flex-col gap-2">
                  <div className="flex gap-3 ">
                    <span>이대호</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-mainColor">@박성민</span>
                    <p>
                      해외에서 뱅킹을 쓸 예정인데, 출국 전에 미리 해야할 것에
                      대해 문의 가능할까요?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <aside className="widget" style={{width:'30%'}}>
      <PostRegisterButton/>
    </aside>
    </div>
    </div>
  );

};

export default QuestionDetail;
