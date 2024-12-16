import React from 'react';

interface HotPostProps {
  rank: number;
  title: string;
}

const POSTS = [
  { rank: 1, title: '국민연금과 개인연금의 차이점' },
  { rank: 2, title: '청년 우대형 청약통장은 일반 청약통장과 어떻게 다른가요?' },
  { rank: 3, title: '청년 전월세 대출을 받으면 이자 지원을 받을 수 있나요?' },
  { rank: 4, title: '연말정산 시 어떤 항목들이 소득공제로 적용되나요?' },
  { rank: 5, title: '사회초년생이 가입할 만한 보험 상품' },
  { rank: 6, title: '청년 전월세 대출 이자 지원' },
];

const truncateTitle = (title: string, maxLength: number) => {
  return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
};

const HotPost: React.FC<HotPostProps> = ({ rank, title }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="text-base font-bold text-[#008485] mr-2.5">{rank}</div>
      <div className="text-sm text-gray-800 w-full cursor-pointer hover:underline hover:text-[#004c99] transition-colors">
        {truncateTitle(title, 50)}
      </div>
    </div>
  );
};

const HotPosts: React.FC = () => {
  return (
    <div className="bg-[#E8F7E6] p-5 rounded-lg w-full">
      <div className="text-lg font-bold mb-2.5">인기 있는 오늘의 질문</div>
      <div className="text-xs text-gray-600 mb-4">10.16. (수) 실시간 기준</div>
      <div className="grid grid-cols-2 grid-rows-3 auto-cols-fr gap-5">
        {POSTS.map((post) => (
          <div key={post.rank} className="bg-white p-2.5 rounded-lg min-h-[50px] flex flex-col items-center justify-center border border-[#F3F5F7]">
            <HotPost rank={post.rank} title={post.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotPosts; 