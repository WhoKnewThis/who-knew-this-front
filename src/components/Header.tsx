import { useEffect, useState } from 'react';
import LoginBtn from './LoginBtn';
import { useNavigate } from 'react-router-dom';

type Me = {
  id?: string;
  email?: string;
  name?: string;
  picture?: string;
};

const Header = () => {
  const navigate= useNavigate();
  const [me,setMe] =useState<Me | null>(null);

  //로컬 스토리지에서 me 읽기 
  const syncMeFromStorage=()=>{
    const meStr=localStorage.getItem("me");
    setMe(meStr ? JSON.parse(meStr):null);
  };
  useEffect(()=>{
    syncMeFromStorage();

    window.addEventListener("auth-changed", syncMeFromStorage);
    return () => window.removeEventListener("auth-changed", syncMeFromStorage);
  }, []);

  
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("me");
    setMe(null);
    navigate("/", { replace: true });
  };


  return (
    <header className="bg-bg-primary font-italic text-text-primary p-4 shadow flex justify-between items-center">
      <button onClick={() => navigate("/")} className="text-2xl font-bold">
        Who Knew This?
      </button>
      {me ? (
        <div className="flex items-center gap-3">
          {me.picture && (
            <img
              src={me.picture}
              alt="profile"
              className="w-9 h-9 rounded-full"
            />
          )}
          <div className="text-sm leading-tight text-right">
            <div className="font-semibold">{me.name ?? "User"}</div>
            <div className="text-gray-500">{me.email ?? ""}</div>
          </div>

          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-md border hover:bg-gray-50"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <LoginBtn />
      )}
    </header>
  );
};

export default Header;