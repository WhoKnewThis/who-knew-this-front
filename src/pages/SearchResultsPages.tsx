// src/pages/SearchResults.tsx
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "../api/axios";
import NoResultsPage from "../components/NoResultsPage";

type TopicLite = { id: number | string; title: string; summary?: string; tags?: string[] };

export default function SearchResults() {
  const [params] = useSearchParams();
  const keyword = params.get("keyword") ?? "";
  const [results, setResults] = useState<TopicLite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!keyword) { setResults([]); setLoading(false); return; }
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/topics/search", {
          params: { keyword },
          signal: controller.signal,
        });
        setResults(Array.isArray(data) ? data : []);
      } catch (e: any) {
        setError(e?.response?.data?.detail?.[0]?.msg || "검색 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [keyword]);

  if (!loading && !error && results.length === 0) {
    return <NoResultsPage keyword={keyword} />;
  }

  return (
    <div className="min-h-screen bg-[#0f111a] text-white">
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-16">
        <h1 className="text-2xl font-bold">검색 결과</h1>
        <p className="text-white/70 mt-1">“{keyword}”에 대한 결과 {results.length}건</p>

        {loading && <p className="mt-6 text-white/70">불러오는 중…</p>}
        {error && <p className="mt-6 text-red-300">{error}</p>}

        {!loading && !error && results.length > 0 && (
          <ul className="mt-6 space-y-3">
            {results.map((t) => (
              <li key={t.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10">
                <Link to={`/topics/${t.id}`} className="block">
                  <div className="text-lg font-semibold">{t.title}</div>
                  {t.summary && <div className="text-white/70 mt-1 line-clamp-2">{t.summary}</div>}
                  {!!t.tags?.length && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {t.tags.slice(0, 5).map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-white/10 border border-white/10">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
