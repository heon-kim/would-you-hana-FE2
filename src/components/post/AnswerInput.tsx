import chatbotImg from '../../assets/img/img_chatbot.png';
import { Button, Input, Tooltip } from 'antd';
import { useState } from 'react';

const { TextArea } = Input;

const Answer: React.FC = () => {
  const [answer, setAnswer] = useState('');

  return (
    <>
      <form className='flex flex-col gap-8'>
        <TextArea
          showCount
          placeholder={`· 답변을 입력하세요.\n· 챗봇을 통해 답변 정보를 얻을 수 있어요.`}
          onChange={(e) => setAnswer(e.target.value)}
          maxLength={500}
          className='h-52'
        />
        <div className='buttons flex  gap-5 justify-end'>
          <Tooltip
            open
            title='챗봇에게 물어보기'
            placement='left'
            color='white'
          >
            <Button
              type='primary'
              shape='circle'
              size='large'
              icon={<img src={chatbotImg} alt='챗봇 이미지' width={30} />}
            ></Button>
          </Tooltip>

          <Button type='primary' size='large'>
            답변 등록
          </Button>
        </div>
      </form>
    </>
  );
};

export default Answer;
