import userIcon from '../../assets/img/icon_user.png';
import { HomeOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const Answer: React.FC = () => {
  return (
    <>
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
            클라우드에 이미 등록된 기기에서는 해외에서도 금융인증서비스를 이용할
            수 있습니다. 고객님의 고민 해결에 도움이 되셨기를 바랍니다.
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
    </>
  );
};

export default Answer;
