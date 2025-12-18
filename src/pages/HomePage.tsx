// src/pages/HomePage.tsx
import { useState, useEffect } from "react";
import { useRandomTopics } from "../hooks/useRandomTopics";
import TopicCard from "../components/TopicCard";
import SearchBar from "../components/SearhBar";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function HomePage() {
  const { topics, loading, refetch } = useRandomTopics(3);
  const [query, setQuery] = useState("");
  const [searching, setSearching]=useState(false);
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
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  // 한/영 통합 정규화
  const normalize = (s: string) => s.normalize("NFKC").trim().toLowerCase();

  const handleSearch = async () => {
    if (searching) return;
    const q = query.trim();
    if (q.length<2) {
        alert("검색어를 두 글자 이상 입력해주세요");
        return;
    }
    
try {
      setSearching(true);
      const { data } = await axios.get(`/topics/search?keyword=${encodeURIComponent(q)}&q=${encodeURIComponent(q)}`);
      const results: Array<{ id: number | string; title: string }> =
        Array.isArray(data) ? data : [];

      const normQ = normalize(q);

      // 1) 정확 일치
      const exact = results.find((t) => normalize(t.title) === normQ);
      if (exact) {
        navigate(`/topics/${exact.id}`);
        return;
      }

      // 2) 부분 일치
      const partial = results.filter((t) => normalize(t.title).includes(normQ));
      if (partial.length === 1) {
        navigate(`/topics/${partial[0].id}`);
        return;
      }
      if (partial.length > 1) {
        // 검색결과 페이지가 있다면 거기로 보냄
        navigate(`/search?query=${encodeURIComponent(q)}`);
        return;
      }

      // 3) 무매칭
      alert("일치하는 주제를 찾지 못했습니다. 다른 키워드로 검색해 보세요.");
    } catch (error) {
      console.error("Search failed", error);
      alert("검색 중 오류가 발생했습니다.");
    } finally {
      setSearching(false);
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
            <button onClick={refetch} disabled={loading} className="... disabled:opacity-60">
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