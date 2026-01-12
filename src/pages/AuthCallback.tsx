import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallback(){
    const navigate= useNavigate();


    return(
        <div className="p-10">
            <h2 className="text-lg font-semibold">
                로그인 처리 중 ...
            </h2>
        </div>
    );
}