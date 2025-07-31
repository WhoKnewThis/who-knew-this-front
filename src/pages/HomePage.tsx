// src/pages/HomePage.tsx
import { useRandomTopics } from "../hooks/useRandomTopics";
import TopicCard from "../components/TopicCard";
import SearchBar from "../components/SearhBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function HomePage() {
  const { topics, loading, refetch } = useRandomTopics(3);
  const [query, setQuery] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();
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

  const handleSearch = async () => {
    if (query.trim() === "") {
      alert("검색어를 입력해주세요.");
      return;
    }
    try {
      const response = await axios.get(`/api/topics/search?q=${query}`);
      const results = response.data;
      const exactMatch = results.find(
        (topic: { title: string }) =>
          topic.title.toLowerCase() === query.toLowerCase()
      );

      if (exactMatch) {
        navigate(`/topic/${exactMatch.id}`);
      } else {
        alert("정확히 일치하는 주제를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("Search failed", error);
      alert("검색 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <div className="w-[1170px] mx-auto pt-6">
        <h1
          className="text-5xl text-text-primary text-center font-semibold mb-[48px] h-[128px]"
          style={{ caretColor: "transparent" }}
        >
          {text.substring(0, breakPoint.length)}
          {text.length > breakPoint.length && <br />}
          {text.substring(breakPoint.length)}
        </h1>
        <SearchBar
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSearch={handleSearch}
        />
        {/* 콘텐츠 */}
        <main>
          <div className="flex items-center justify-between mb-[17px]">
            <h1 className="text-text-primary text-2xl font-bold">
              What's Today's WKT?{" "}
            </h1>
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