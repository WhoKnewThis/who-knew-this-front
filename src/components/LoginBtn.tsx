import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginBtn(){
    const GOOGLE_AUTH_URL= "https://accounts.google.com/o/oauth2/v2/auth?" + 
    new URLSearchParams({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        redirect_uri: "http://localhost:8000/auth/callback", 
        response_type: "code",
      scope: "email profile",
    }).toString();

    const handleGoogleLogin=()=>{
        window.location.href = GOOGLE_AUTH_URL;

    }

    return(
         <button
      onClick={handleGoogleLogin}
      className="bg-btn-primary text-lg text-bg-primary p-2 w-[120px] h-12 rounded-md hover:bg-btn-primary2"
    >
      Log in
    </button>
    );
}