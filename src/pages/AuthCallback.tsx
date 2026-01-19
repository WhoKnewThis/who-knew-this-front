import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AuthCallback() {
  const ran=useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (ran.current)return;
    ran.current=true;

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const returnedState= params.get("state");
    
    const savedState=localStorage.getItem("googe_oauth_state");

     // state 검증(권장): CSRF 방지
    if (!returnedState || !savedState || returnedState !== savedState) {
      navigate("/login?error=state", { replace: true });
      return;
    }

    if (!code) {
      navigate("/login?error=nocode",{replace:true});
      return;
    }

    const exchange = async () => {
      try {
        const baseUrl = (process.env.REACT_APP_API_BASE_URL ?? "").replace(/\/$/, "");
        if(!baseUrl){
          console.warn("REACT_APP_API_BASE_URL is empty. Check env settings.");
        }
        const loginUrl = baseUrl ? `${baseUrl}/api/auth/login/google` : "/api/auth/login/google";
        const meUrl = baseUrl ? `${baseUrl}/api/users/me` : "/api/users/me";
       
        //#1) 토근 교환 
        const res = await axios.post(loginUrl, { auth_code: code });
        const { access_token, refresh_token } = res.data;

        if (!access_token) throw new Error("No access_token in response");
        //#2) 토근 저장 
        localStorage.setItem("accessToken", access_token);
        if (refresh_token) localStorage.setItem("refreshToken", refresh_token);

        //#3) 내 정보 조회 
        const meRes= await axios.get(meUrl,{
          headers:{Authorization:`Bearer ${access_token}`},
        });

        navigate("/",{replace:true});
      } catch (e:any) {
        console.log("status:", e?.response?.status);
        console.log("data(raw):", e?.response?.data);
        console.log("data(JSON):", JSON.stringify(e?.response?.data, null, 2));
        console.log("message:", e?.message);
        console.log("axios config url:", e?.config?.url);
        console.error(e);
        navigate("/login?error=oauth", { replace: true });
      }
    };

    exchange();
  }, [navigate]);

    return (
        <div className="flex h-screen items-center justify-center">
          <h2 className="text-lg font-medium text-gray-700">
            로그인 처리 중입니다...
          </h2>
        </div>
      );
      }
