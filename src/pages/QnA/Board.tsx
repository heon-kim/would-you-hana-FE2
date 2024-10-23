import React from 'react';

interface Post {
  id: number;
  title: string;
  views: number;
  reach: number;
  time: string;
  category: string;
}

const posts: Post[] = [
  {
    id: 1,
    title: '해외에서도 금융인증서를 이용할 수 있나요?',
    views: 43,
    reach: 80,
    time: '1일 전',
    category: '외환 및 국제금융',
  },
  {
    id: 2,
    title: '모바일 OTP를 활성화하려면 어떻게 하나요?',
    views: 9,
    reach: 10,
    time: '1일 전',
    category: '전자금융',
  },
  {
    id: 3,
    title: '장기 미사용 이체 제한 거래 정지가 되었습니다.',
    views: 12,
    reach: 20,
    time: '1일 전',
    category: '기타',
  },
  {
    id: 4,
    title: '주거래 손님에게는 어떠한 혜택이 있나요?',
    views: 50,
    reach: 90,
    time: '5일 전',
    category: '기타',
  },
  {
    id: 5,
    title: '연락처 이체시 받는 분도 하나원큐 앱이 설치되어 있어야 하나요?',
    views: 34,
    reach: 70,
    time: '6일 전',
    category: '전자금융',
  },
  {
    id: 6,
    title: 'ISA 계좌의 세금 혜택이 어떻게 적용되나요?',
    views: 40,
    reach: 80,
    time: '2024.10.07',
    category: '재무 계획',
  },
];

const Board: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        paddingLeft: '20%',
        paddingRight: '20%',
      }}
    >
      <header className='flex justify-end items-center'>
        <div className='flex space-x-3 items-end text-gray-400' style={{ fontSize: '13px', fontWeight:'300'}}>
          <button>
            최근 답변순
          </button>
          <button>최신순</button>
          <button>인기순</button>
        </div>
      </header>
      <ul className='divide-y divide-gray-300'>
        {posts.map((post) => (
          <li key={post.id} className='py-6'>
            <button className='text-start'>
            <div>
              <p className=' text-gray-500 mb-2' style={{fontSize:'15px'}}>{post.category}</p>
              <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                {post.title}
              </h3>
              <p className='text-gray-500'  style={{fontSize:'12px'}}>
                <span className='text-mainColor'>조회 {post.views}</span> ·
                도달률 {post.reach} · {post.time}
              </p>
            </div>
            </button>
          </li>
        ))}
      </ul>
      <footer className='mt-6 flex justify-center space-x-5'>
        <button className='bg-white rounded'>
          1
        </button>
        <button className='bg-white rounded'>
          2
        </button>
        <button className='bg-white rounded'>
          3
        </button>
        <button className='bg-white rounded'>
          4
        </button>
        <button className='bg-white rounded'>
          5
        </button>
        <p> ··· </p>
        <button className='bg-white rounded'>
          >
        </button>
        {/* 페이지 버튼 추가 가능 */}
      </footer>
    </div>
  );
};

export default Board;
