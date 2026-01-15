import React from "react";
//구글 화면으로 보내는 단계 
export default function LoginBtn() {
  const state = crypto.randomUUID();
  localStorage.setItem("google_oauth_state", state);

  const GOOGLE_AUTH_URL =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
      redirect_uri: "http://localhost:3000/auth/callback",
      response_type: "code",
      scope: "openid email profile",
      state,
    }).toString();

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-btn-primary text-lg text-bg-primary p-2 w-[120px] h-12 rounded-md hover:bg-btn-primary2">
      Log in
    </button>
  );
}
