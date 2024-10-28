// src/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-600">404</h1>
      <p className="mt-4 text-lg text-gray-700">페이지를 찾을 수 없습니다.</p>
      <Link to="/" className="mt-6 text-mainColor hover:underline">
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
