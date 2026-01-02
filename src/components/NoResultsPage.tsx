// src/components/NoResultsPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface NoResultsPageProps {
  keyword: string;
}

const NoResultsPage: React.FC<NoResultsPageProps> = ({ keyword }) => {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col items-center justify-center px-6">
      <div className="text-center bg-white/5 border border-white/10 rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">검색 결과 없음</h2>
        <p className="text-text-primary/70 mb-6">
          "<strong>{keyword}</strong>"에 대한 검색 결과가 없습니다.
        </p>
        <p className="text-text-primary/70 mb-6">
          철자를 확인하거나 다른 키워드로 다시 검색해 보세요.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NoResultsPage;
