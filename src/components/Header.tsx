import React from 'react';
import LoginBtn from './LoginBtn';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate= useNavigate();
  return (
    <header className="bg-bg-primary font-italic text-text-primary p-4 shadow flex justify-between items-center">
      <button onClick={()=>navigate("/")}
        className="text-2xl font-bold">Who Knew This?</button>
      <LoginBtn/>
    </header>
  );
};

export default Header;
