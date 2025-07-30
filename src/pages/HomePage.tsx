// src/pages/HomePage.tsx
import { useRandomTopics } from "../hooks/useRandomTopics";
import TopicCard from "../components/TopicCard";
import SearchBar from "../components/SearhBar";
import { useState, useEffect } from "react";

export default function HomePage() {
  const { topics, loading, refetch } = useRandomTopics(3);
  const [search, setSearch] = useState("");
  const [text, setText] = useState("");
  const fullText = "A journey through things that you didn’t know.";
  const breakPoint = "A journey through things that ";

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      if (i <= fullText.length) {
        setText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(intervalId);
      }
    }, 100); // Animation speed in ms

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className="w-[1170px] mx-auto pt-6">
        {/* 여기에 서치 바 만들어야함 **/}
        <h1
          className="text-5xl text-text-primary text-center font-semibold mb-[48px] h-[128px]"
          style={{ caretColor: "transparent" }}
        >
          {text.substring(0, breakPoint.length)}
          {text.length > breakPoint.length && <br />}
          {text.substring(breakPoint.length)}
        </h1>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        {/* 콘텐츠 */}
        <main>
          <div className="flex items-center justify-between mb-[17px]">
            <h1 className="text-text-primary text-2xl font-bold">
              What's Today's WKT?{" "}
            </h1>
            {/* 다시 뽑기 버튼 */}
            <button
              onClick={refetch}
              className="px-4 py-2 bg-btn-primary text-black rounded hover:bg-sky-200"
            >
              다른 주제 보기
            </button>
          </div>
          {loading ? (
            <p className="text-gray-500">불러오는 중...</p>
          ) : topics.length > 0 ? (
            <div className="grid grid-cols-3 gap-[30px]">
              {/** grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 */}
              {topics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          ) : (
            <p className="text-red-500">주제를 불러오지 못했습니다.</p>
          )}
        </main>
      </div>
    </div>
  );
}
