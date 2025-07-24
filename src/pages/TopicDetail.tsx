import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { Topic } from "../hooks/useRandomTopics";

function TopicDetail() {
  const { topicId } = useParams<{ topicId: string }>();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/topics/${topicId}`);
        setTopic(res.data);
      } catch (err) {
        setError("주제를 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (topicId) {
      fetchTopic();
    }
  }, [topicId]);

  if (loading) {
    return <div className="text-center p-8">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  if (!topic) {
    return <div className="text-center p-8">주제 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="bg-bg-primary p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{topic.title}</h1>
      <p className="text-lg text-gray-700 mb-6">{topic.summary}</p>
      
      <div className="mb-6">
        {topic.tags?.map((tag) => (
          <span
            key={tag}
            className="inline-block bg-btn-sub-purple2 text-text-primary px-3 py-1 rounded-full text-sm mr-2 mb-2"
          >
            #{tag}
          </span>
        ))}
      </div>

      {topic.related_topics?.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">🔗 관련 주제</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            {topic.related_topics.map((related, i) => (
              <li key={i}>{related}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default TopicDetail;
