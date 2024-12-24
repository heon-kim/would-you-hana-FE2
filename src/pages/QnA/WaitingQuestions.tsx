import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostList from '../../components/board/PostList/PostList';
import { useSelector } from 'react-redux';
import { RootState } from '../../hoc/store';
import { AxiosResponse } from 'axios';
import { qnaService } from '../../services/qna.service';
import { QnaListDTO } from '../../types/dto/question.dto';
const POSTS_PER_PAGE = 5;

const Board: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const {userLocation, branchName} = useSelector((state: RootState) => state.auth);
  const [questions, setQuestions] = useState<QnaListDTO[]>([]); // QnaListDTO 배열 타입 지정

  // 데이터 가져오기 함수
  const getQuestions = async () => {

    try {
      const response: AxiosResponse<QnaListDTO[]> = await qnaService.getQnaListBanker('latest', branchName??'');

      if (response && response.data) {
        setQuestions(response.data.filter(q=>!q.answerBanker));
      }

    } catch (err) {
      console.error('Error fetching data:', err);

    }
  }

  // userLocation이 변경될 때마다 데이터 새로 불러오기
  useEffect(() => {
    getQuestions();
  }, [userLocation]);

  const handlePostClick = useCallback((postId: number) => {
    navigate(`/qna/detail/${postId}`);
  }, [navigate]);

  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = questions.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  return (
    <div className="w-full px-[15%] py-5">
      <h1 className="text-2xl font-bold mb-6">대기중인 질문</h1>

      <div className="flex flex-col gap-5 w-full">
        <div>
          <PostList
            posts={currentPosts}
            currentPage={currentPage}
            postsPerPage={POSTS_PER_PAGE}
            totalPosts={questions.length}
            onPageChange={setCurrentPage}
            onPostClick={handlePostClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Board;
