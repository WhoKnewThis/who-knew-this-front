import { useState, useEffect,useCallback } from "react";
import instance from "../api/axios";

export interface Topic {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  related_topics: string[];
}

export const useRandomTopics = (count: number = 3) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

 const fetchTopic = useCallback(async () => {
    try {
      setLoading(true);
      const res = await instance.get(`/topics/random?count=${count}`);
      console.log("API 응답 데이터:", res.data);
      setTopics(res.data);
    } catch (error) {
      console.error("랜덤 주제 가져오기 실패", error);
    } finally {
      setLoading(false);
    }
  }, [count]);

  useEffect(() => {
    fetchTopic();
  }, [fetchTopic]);

  return { topics, loading, refetch: fetchTopic };
};