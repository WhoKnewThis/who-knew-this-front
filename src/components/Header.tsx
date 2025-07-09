import React from 'react';

const Header = () => {
  return (
    <header className="bg-bg-primary text-text-primary p-4 shadow flex justify-between items-center">
      <h1 className="text-2xl font-bold">Who Knew This?</h1>
      <button className="bg-btn-primary text-black p-2 w-24 hover:underline">로그인</button>
    </header>
  );
};

export default Header;
