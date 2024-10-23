import React, { useState } from 'react';
import '../../App.css';
import { Select } from 'antd';

const QuestionRegister: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const maxTitleLength = 30;
  const maxContentLength = 5000;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
        width: '60%',
        alignSelf: 'center',
      }}
    >
      <h1
        style={{
          color: 'black',
          fontSize: '30px',
          lineHeight: '1.2',
          textAlign: 'left',
          marginTop: '20px',
          marginBottom: '40px',
          fontWeight: 'bold',
        }}
      >
        <p>
          질문을 남겨주시면,
          <br />
          <span style={{ color: '#008485' }}> 내 주변의 하나 가족</span>
          들이
          <br /> 빠른 시일 내에 답해드려요!
        </p>
      </h1>
      <div style={{ width: '100%' }}>
        <label className='block mb-2 font-bold'>분야</label>
        
        <Select
          showSearch
          style={{ width: '100%', height: '60px'}}
          placeholder="어떤 분야가 궁금한가요?"
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={[
            { value: '1', label: '예금/적금' },
            { value: '2', label: '이체' },
            { value: '3', label: '자산관리' },
            { value: '4', label: '퇴직연금' },
            { value: '5', label: '전자금융' },
            { value: '6', label: '대출' },
          ]}
        />

        <div
          style={{
            marginTop: '10px',
            backgroundColor: '#F3F5F7',
            borderRadius: '5px',
            width: '100%',
            textAlign: 'start',
            padding: '20px',
            fontFamily: 'Hana2Regular',
            lineHeight: '1.8',
            fontWeight: '300',
            color: '#7E8082',
            fontSize: '15px',
          }}
        >
      
          <p style={{ color: 'black' }}>이런 질문을 해보세요.</p>
          <p>· 해외에서 금융인증서를 활용할 수 있나요?</p>
          <p>· 여권번호로도 금융인증서 발급이 되나요?</p>
          <p>· 금융인증서의 기한을 연장할 수 있나요?</p>
        </div>
      </div>

      <div style={{ width: '100%', marginTop: '40px' }}>
        <div className='mx-100 mx-auto'>
          <div className='mb-8'>
            <label className='block mb-2 font-bold'>제목</label>
            <div className='relative'>
              <input
                type='text'
                placeholder='궁금한 점을 요약해서 작성해 주세요.'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={maxTitleLength}
                className='w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-gray-500'
                style={{ fontWeight: '300' }}
              />
              <span className='absolute bottom-2 right-3 text-gray-500 text-sm'>{`${title.length}/${maxTitleLength}`}</span>
            </div>
          </div>

          <div className='mb-8'>
            <label className='block mb-2 font-bold'>내용</label>
            <div className='relative'>
              <textarea
                placeholder={`· 자세하게 적으면 좋은 답변을 받을 수 있어요.\n· 개인정보(본명, 전화 번호 등)를 쓰면 안 돼요.\n· 질문에서 내 이름은 보이지 않아요.`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={maxContentLength}
                className='w-full border border-gray-300 rounded-md p-3 h-52 resize-none focus:outline-none focus:border-gray-500'
                style={{ fontWeight: '300' }}
              />
              <span className='absolute bottom-2 right-3 text-gray-500 text-sm'>{`${content.length}/${maxContentLength}`}</span>
            </div>
          </div>

          <div className='flex items-center mb-8'>
            <button className='w-12 h-12 border-2 border-dashed border-mainColor rounded-lg flex justify-center items-center text-mainColor text-xl'>
              +
            </button>
            <span className='ml-4 text-gray-500 text-sm'>0/5</span>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: '10px',
          backgroundColor: '#F3F5F7',
          borderRadius: '5px',
          width: '100%',
          textAlign: 'start',
          padding: '20px',
          fontFamily: 'Hana2Regular',
          color: '#7E8082',
          fontSize: '14px',
          lineHeight: '1.8',
          fontWeight: '300',
        }}
      >
        <div>
          <p>이런 경우 답변을 받지 못할 수 있어요.</p>
          <p>
            · 개인정보(이름, 전화번호, 주민등록번호, 읍/면/동 이하 상세 주소
            등)가 있는 경우
          </p>
          <p>
            · 금융과 관련이 없거나 질문의 내용이 충분하지 않아 답변하기 어려운
            경우
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <input type='checkbox' id='agree' style={{ marginRight: '10px' }} />
        <label
          htmlFor='agree'
          style={{ fontFamily: 'Hana2Regular', fontSize: '14px' }}
        >
          개인정보 처리 방침에 동의합니다.
        </label>
      </div>

      <button
        style={{
          width: '100%',
          height: '50px',
          textAlign: 'center',
          color: 'white',
          backgroundColor: '#008485',
          marginTop: '40px',
          marginBottom: '40px',
          fontWeight: '300',
        }}
      >
        질문 등록
      </button>
    </div>
  );
};

export default QuestionRegister;
