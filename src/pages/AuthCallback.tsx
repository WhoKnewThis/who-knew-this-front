import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AuthCallback() {
  const ran=useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (ran.current)return;
    ran.current=true;

    if (!code) {
      navigate("/login");
      return;
    }

    const exchange = async () => {
      try {
        const res = await axios.post("/api/auth/login/google", {
          auth_code:code,
        });
        const { access_token, refresh_token } = res.data;

        if (!access_token) throw new Error("No access_token in response");

        localStorage.setItem("accessToken", access_token);
        if(refresh_token) localStorage.setItem("refreshToken",refresh_token);
        navigate("/dashboard");
      } catch (e:any) {
        console.log("status:", e?.response?.status);
        console.log("data(raw):", e?.response?.data);
        console.log("data(JSON):", JSON.stringify(e?.response?.data, null, 2));
        console.log("message:", e?.message);
        console.log("axios config url:", e?.config?.url);
        console.error(e);
        navigate("/login?error=oauth");
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
