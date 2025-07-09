// src/pages/HomePage.tsx
import { useRandomTopics } from "../hooks/useRandomTopics";
import TopicCard from "../components/TopicCard";
import SearchBar from "../components/SearhBar";
import { useState } from "react";

export default function HomePage() {
  const { topics, loading, refetch } = useRandomTopics(3);
  const [search, setSearch]=useState("");
  return (
    <div className="min-h-screen p-6 bg-bg-primary">
      {/* 여기에 서치 바 만들어야함 **/}
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)}/>
      {/* 콘텐츠 */}
      <main>
        <h1 className="text-text-primary text-2xl font-bold mb-[17px]">What's Today's WKT? </h1>
        {loading ? (
          <p className="text-gray-500">불러오는 중...</p>
        ) : topics.length > 0 ? (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        ) : (
          <p className="text-red-500">주제를 불러오지 못했습니다.</p>
        )}
      </main>

      {/* 다시 뽑기 버튼 */}
      <div className="mt-6">
        <button
          onClick={refetch}
          className="px-4 py-2 bg-btn-primary text-black rounded hover:bg-sky-200"
        >
          다른 주제 보기
        </button>
      </div>
    </div>
  );
}
