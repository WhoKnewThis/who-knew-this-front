import React, { useState } from "react";

export default function SingUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <div className="m-8 flex flex-col items-center justify-center text-text-primary">
      {/* 상단 타이틀 */}
      <h1 className="text-3xl font-bold mb-8">WHO KNEW THIS</h1>

      {/* 회원가입 박스 */}
      <div className="bg-btn-sub-purple3 w-[585px] h-[640px] p-8 rounded-xl shadow-lg flex flex-col items-center justify-center">
        <p className="mb-6 text-lg font-semibold text-center text-bg-primary">
            회원가입
        </p>
        <div>
            이름
        </div>
        {/* Email, Password*/}
        <div className="w-[380px] mb-4">
          <label className="block text-text-primary2 text-base mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            className="w-full h-[50px] box-border px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-btn-sub-purple2 text-bg-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="w-[380px] mb-4">
          <label className="block text-text-primary2 text-base mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="w-full h-[50px] box-border px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-btn-sub-purple2 text-bg-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* 회원가입 버튼 */}
        <button
          className={`w-[380px] h-[50px] text-white py-2 rounded-md mb-4 mt-10 transition ${
            isFormValid
              ? "bg-btn-primary hover:bg-btn-primary2"
              : "bg-btn-disabled cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >
          Sign up
        </button>

        <hr className="w-full my-4" />
        
      </div>
    </div>
  );
}

