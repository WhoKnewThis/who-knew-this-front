import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginBtn(){
    const navigate= useNavigate();

    return(
        <button
            onClick={()=>navigate('/login')}
            className="bg-btn-primary text-lg text-bg-primary p-2 w-[120px] h-12 rounded-md hover:bg-btn-primary2">Log in
        </button>
    );
}