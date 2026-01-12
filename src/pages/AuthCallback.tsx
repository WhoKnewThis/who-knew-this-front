import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");

    if (!code) {
      navigate("/login");
      return;
    }

    const exchange = async () => {
      try {
        const res = await axios.post("/api/auth/exchange", {
          code,
          state,
          provider: "google",
        });

        const { jwt } = res.data;
        localStorage.setItem("accessToken", jwt);
        navigate("/dashboard");
      } catch (e) {
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
