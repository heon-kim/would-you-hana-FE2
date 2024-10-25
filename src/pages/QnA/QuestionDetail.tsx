import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Input } from 'antd';
import { StarOutlined, HomeOutlined, PhoneOutlined } from '@ant-design/icons';

import userIcon from '../../assets/img/icon_user.png';
import '../../App.css';

const QuestionRegister: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const { TextArea } = Input;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
        width: '60%',
        alignSelf: 'center',
        paddingTop: '40px',
        paddingBottom: '20px',
      }}
    >
      <div className="flex-row"></div>
      <div className="article flex flex-col gap-6">
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
              Q. 해외에서 금융인증서를 활용할 수 있나요?
            </h1>
            <div className="flex gap-4 text-xs text-gray-400">
              <span>별송이내꺼야</span>
              <span>조회 44</span>
              <span>좋아요 12</span>
              <span>스크랩 0</span>
            </div>
            <div className="flex justify-end gap-4">
              {/* <Button type="primary">답변 달기</Button> */}
              <Button icon={<StarOutlined />}>저장</Button>
            </div>
          </div>
          <div className="w-full">
            <p>
              제가 2024년 10월부터 2025년 2월까지 해외 출장을 가는데,
              하나은행에서 발급받은 금융인증서 만료 기간이 2025년 3월까지로
              알고있습니다. 혹시 해외에서도 별도의 확장 프로그램 없이
              금융인증서를 활용할 수 있는지 여쭙고 싶습니다!{' '}
            </p>
            {questionId ? (
              <p>Question ID: {questionId}</p>
            ) : (
              <p>No Question ID provided.</p>
            )}
          </div>
          <div className="question__footer text-gray-400">
            <span>3일 전</span>
          </div>
        </div>
        <div className="answer flex flex-col border rounded shadow-md">
          <h1 className="p-5 font-bold bg-pointColor">
            하나은행 성동구 성수역 지점 홍창기 대리의 답변
          </h1>
          <div className="p-5 flex flex-col gap-5">
            <div className="comment__header flex justify-between font-light border-b pb-5">
              <div className="flex gap-3 ">
                <img src={userIcon} alt="user icon" className="w-12 h-12" />
                <div>
                  <div className="flex gap-3 ">
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
                <HomeOutlined />
                <PhoneOutlined />
              </div>
            </div>
            <p className="comment__body font-light ">
              안녕하세요,
              <br /> 하나은행 성동구 성수역 지점에 근무하고 있는 홍창기
              대리입니다.
              <br />
              <br /> 클라우드에 이미 등록된 기기에서는 해외에서도
              금융인증서비스를 이용할 수 있습니다. 또한 휴대폰을 해외로밍한 경우
              클라우드에 새로 기기를 등록하여 금융인증서비스를 이용할 수도
              있습니다.
              <br /> 고객님의 고민 해결에 도움이 되셨기를 바랍니다.
              <br />
              <br /> 감사합니다.
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
      <aside className="widget"></aside>
    </div>
  );
};

export default QuestionRegister;
