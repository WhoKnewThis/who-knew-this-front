import { useState, useEffect } from "react";
import axios from "axios";

export interface Topic{
    id:string;
    title:string;
    summary:string;
    tags:string[];
    related_topics:string[];
}

export const useRandomTopics=()=>{
    const [topic,setTopic]=useState<Topic|null>(null);
    const [loading,setLoading]=useState(true)

    const fetchTopic=async()=>{
        try{
            setLoading(true);
            const res=await axios.get(`/api/topics/random`);
            console.log('API 응답 데이터:', res.data);
            setTopic(res.data[0])
        }catch(error){
            console.error("랜덤 주제 가져오기 실패",error)
        }finally{
            setLoading(false);
        }
    };

 useEffect(() => {
    fetchTopic();
  }, []);

  return { topic, loading, refetch: fetchTopic };
};

