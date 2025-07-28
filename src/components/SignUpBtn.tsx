import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpBtn(){
    const navigate= useNavigate();
    return(
        <div className="text-center text-sm text-text-gray mb-4">
      <p>아직 회원이 아니신가요?</p>
      <button
            onClick={()=>navigate('/sign')}
            className="underline text-btn-primary">회원가입하기</button>
      
    </div>
    
    );
}