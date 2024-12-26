import React from 'react';
import { TodayQnaListDTO } from '../../../types/dto/question.dto';
import { useNavigate } from 'react-router-dom';

interface HotPostProps {
  rank: number;
  title: string;
  postId: string;
}


const truncateTitle = (title: string, maxLength: number) => {
  return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
};

const getTodayDate = () => {
  const date = new Date();
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 (1~12)
  const day = String(date.getDate()).padStart(2, "0"); // 일 (01~31)
  const dayOfWeek = days[date.getDay()]; // 요일 ("일", "월", ...)

  return `${month}.${day}. (${dayOfWeek})`;
};

const HotPost: React.FC<HotPostProps> = ({ rank, title, postId }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center w-full" onClick={()=>navigate(`/qna/detail/${postId}`)}>
      <div className="text-base font-bold text-[#008485] mr-2.5">{rank}</div>
      <div className="text-sm text-gray-800 w-full cursor-pointer hover:underline hover:text-[#004c99] transition-colors">
        {truncateTitle(title, 50)}
      </div>
    </div>
  );
};

const HotPosts: React.FC<{ todayQuestions: TodayQnaListDTO[] }> = ({ todayQuestions }) => {
  const gridRowsClass = 
    todayQuestions.length === 0 
      ? "hidden" 
      : `grid-rows-${Math.ceil(todayQuestions.length / 2)}`; // 2개씩 한 줄로 배치

  return (
    <div className={`bg-[#E8F7E6] p-5 rounded-lg w-full ${todayQuestions.length === 0 ? "hidden" : ""}`}>
    <div className="text-lg font-bold mb-2.5">인기 있는 오늘의 질문</div>
    <div className="text-xs text-gray-600 mb-4">{getTodayDate()} 기준</div>
    <div className={`grid grid-cols-2 auto-cols-fr gap-5 ${gridRowsClass}`}>
      {todayQuestions.map((post: TodayQnaListDTO, index: number) => (
        <div
          key={post.questionId}
          className="bg-white p-2.5 rounded-lg min-h-[50px] flex flex-col items-center justify-center border border-[#F3F5F7]"
        >
          <HotPost rank={index + 1} title={post.title} postId={post.questionId} />
        </div>
      ))}
    </div>
  </div>
  );
};

export default HotPosts; 