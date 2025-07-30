import { Link } from "react-router-dom";
import { Topic } from "../hooks/useRandomTopics";

interface Props {
  topic: Topic;
}

export default function TopicCard({ topic }: Props) {
  return (
    <div className="bg-btn-sub w-[385x] h-[300px] p-8 mt-6 rounded shadow transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
      {/* 
      <p className="text-gray-700 mb-4">{topic.summary}</p> */}

      {/* 태그 */}
      <div className="mb-3 text-sm flex flex-wrap justify-center gap-2">
        {topic.tags?.map((tag) => (
          <span
            key={tag}
            className="text-base inline-block bg-btn-sub-purple2 text-text-primary px-4 py-2 rounded-full"
          >
            # {tag}
          </span>
        ))}
      </div>
            <Link to={`/topic/${topic.id}`}>
        <h2 className="text-bg-primary text-2xl font-bold m-12 text-center">
          {" "}
          {topic.title}
        </h2>
      </Link>

      {/* 관련 주제 */}
      {topic.related_topics?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-base font-bold text-gray-600 mb-1">
            🔖Realated Topics
          </h3>
          <ul className="flex pl-5 text-base text-bg-primary justify-center gap-4">
            {topic.related_topics.map((related, i) => (
              <li key={i}>{related}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
