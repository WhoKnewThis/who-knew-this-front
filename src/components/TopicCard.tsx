import { Topic } from "../hooks/useRandomTopics";

interface Props{
    topic:Topic
}

export default function TopicCard({ topic }: Props) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-2">📌 {topic.title}</h2>

      <p className="text-gray-700 mb-4">{topic.summary}</p>

      {/* 태그 */}
      <div className="mb-3 text-sm space-x-2">
        {topic.tags.map((tag) => (
          <span
            key={tag}
            className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* 관련 주제 */}
      {topic.related_topics.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">🔗 관련 주제</h3>
          <ul className="list-disc pl-5 text-sm text-gray-800">
            {topic.related_topics.map((related, i) => (
              <li key={i}>{related}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}