import React from 'react';
import LoginBtn from './LoginBtn';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate= useNavigate();
  return (
    <header className="bg-bg-primary font-italic text-text-primary p-4 shadow flex justify-between items-center">
      <button onClick={()=>navigate("/")}
        className="text-2xl font-bold p-4">Who Knew This?</button>
      <div className='p-4'>
        <LoginBtn/>
      </div>
    </header>
  );
};

export default Header;
