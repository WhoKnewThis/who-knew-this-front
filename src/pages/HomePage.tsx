// src/pages/HomePage.tsx
import { useRandomTopics } from "../hooks/useRandomTopics";
import TopicCard from "../components/TopicCard";

export default function HomePage() {
  const { topics, loading, refetch } = useRandomTopics(3);

  return (
    <div className="min-h-screen p-6 bg-bg-primary">
      {/* 헤더 */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text-primary">Today’s WKT</h1>
        <button className="bg-btn-primary text-black p-2 w-24 hover:underline">로그인</button>
      </header>

      {/* 여기에 서치 바 만들어야함 **/}

      {/* 콘텐츠 */}
      <main>
        {loading ? (
          <p className="text-gray-500">불러오는 중...</p>
        ) : topics.length > 0 ? (
          <div className="mt-[400px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
