// src/pages/TopicDetail.tsx
import { useEffect, useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { Topic } from "../hooks/useRandomTopics";

function DifficultyBar({ value = 0 }) {
  // value: 0~100 가정 (백엔드가 1~5면 프론트에서 환산해도 OK)
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-cyan-300"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-3 py-1 rounded-full text-sm bg-white/10 text-white/90 border border-white/10">
      {children}
    </span>
  );
}

export default function TopicDetail() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const run = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/topics/${topicId}`, { signal: controller.signal });
        setTopic(res.data);
      } catch (err: any) {
        if (err.name !== "CanceledError" && err.name !== "AbortError") {
          setError("주제를 불러오는 데 실패했습니다.");
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };
    if (topicId) run();
    return () => controller.abort();
  }, [topicId]);

  const difficultyPct = useMemo(() => {
    // 백엔드 스키마에 맞춰 환산:
    // 1~5 스케일이라면: Math.round(((topic?.difficulty ?? 0) / 5) * 100)
    // 0~100 그대로라면: topic?.difficulty ?? 0
    const raw: any = (topic as any)?.difficulty;
    if (typeof raw === "number") {
      // 예: 1~5 → %
      return raw <= 5 ? Math.round((raw / 5) * 100) : raw;
    }
    return 0;
  }, [topic]);

  return (
    <div
      className="
        min-h-screen
        bg-bg-primary
        text-white
      "
    >
      {/* 상단 네비/툴바 영역이 있다면 여기 배치 */}
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
        {loading && (
          <div className="bg-white/5 backdrop-blur rounded-2xl p-8 shadow-xl border border-white/10">
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-2/3 bg-white/10 rounded" />
              <div className="h-4 w-1/2 bg-white/10 rounded" />
              <div className="h-3 w-full bg-white/10 rounded" />
              <div className="h-3 w-5/6 bg-white/10 rounded" />
              <div className="h-3 w-4/6 bg-white/10 rounded" />
            </div>
          </div>
        )}

        {error && (
          <div className="text-center p-8 text-red-300 bg-red-900/20 rounded-xl border border-red-500/30">
            {error}
          </div>
        )}

        {!loading && !error && !topic && (
          <div className="text-center p-8 text-white/80 bg-white/5 rounded-xl border border-white/10">
            주제 정보를 찾을 수 없습니다.
          </div>
        )}

        {topic && (
          <article className="bg-white/5 backdrop-blur rounded-2xl shadow-xl border border-white/10">
            {/* 헤더 */}
            <header className="px-8 pt-8 pb-4 border-b border-white/10">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                  {topic.title}
                </h1>
                <button
                  onClick={() => navigate(-1)}
                  className="text-sm px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10"
                >
                  ← 뒤로
                </button>
              </div>

              {/* 난이도 - 가 지금 없음 비상 비상*/}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm uppercase tracking-wide text-white/70">
                    difficulty 가 없음 비상 비상
                  </span>
                  <span className="text-xs text-white/60">{difficultyPct}%</span>
                </div>
                <DifficultyBar value={difficultyPct} />
              </div>
            </header>

            {/* 본문 */}
            <div className="px-8 py-6 space-y-8">
              {/* 요약 */}
              {topic.summary && (
                <section>
                  <p className="text-base md:text-lg leading-7 text-white/90">
                    {topic.summary}
                  </p>
                </section>
              )}

              {/* 태그 */}
              {!!topic.tags?.length && (
                <section>
                  <h3 className="text-sm uppercase tracking-wide text-white/70 mb-3">
                    tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {topic.tags!.map((t) => (
                      <Link key={t} to={`/tags/${encodeURIComponent(t)}`}>
                        <Chip>#{t}</Chip>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* 관련 주제 */}
              {!!topic.related_topics?.length && (
                <section>
                  <h3 className="text-sm uppercase tracking-wide text-white/70 mb-3">
                    related_topics
                  </h3>
                  <ul className="list-disc list-outside pl-6 space-y-1 text-white/90">
                    {topic.related_topics!.map((rt, i) => (
                      <li key={i}>
                        {/* rt 가 id면 /topics/:id 로, 문자열이면 검색으로 */}
                        <Link
                          to={
                            /^\d+$/.test(String(rt))
                              ? `/topics/${rt}`
                              : `/search?query=${encodeURIComponent(String(rt))}`
                          }
                          className="underline decoration-white/30 hover:decoration-white"
                        >
                          {String(rt)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* 인사이트/설명문 (예: bullets) */}
              {!!(topic as any)?.highlights?.length && (
                <section>
                  <h3 className="text-sm uppercase tracking-wide text-white/70 mb-3">
                    notes
                  </h3>
                  <ul className="space-y-2">
                    {(topic as any).highlights.map((line: string, idx: number) => (
                      <li
                        key={idx}
                        className="text-white/90 before:content-['“'] after:content-['”']"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* 출처 */}
              {!!(topic as any)?.sources?.length && (
                <section>
                  <h3 className="text-sm uppercase tracking-wide text-white/70 mb-3">
                    출처 및 더 읽어보기
                  </h3>
                  <ul className="space-y-1">
                    {(topic as any).sources.map((href: string, idx: number) => (
                      <li key={idx}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="underline decoration-white/30 hover:decoration-white break-all"
                        >
                          {href}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
