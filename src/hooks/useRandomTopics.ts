//axios 확인 
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
            const res=await axios.get(`http://158.180.68.123/api/topics/random`);
            setTopic(res.data)
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