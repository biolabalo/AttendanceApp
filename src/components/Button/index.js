import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.scss';

const Button = ({ className = '', link, onClick, text, btnRef, children, disabled=false }) => {
  const history = useHistory();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (link) history.push(link);
  };

  return (
    <button
      ref={btnRef}
      disabled={disabled}
      className={`btn w-full flex justify-center items-center rounded-md p-3 overflow-hidden ${className}   ${disabled ? "disabled:opacity-50 cursor-not-allowed " :  "transition duration-300 delay-200"}`}
      onClick={handleClick}
    >
      {children ? children : <p className="text-white font-bold">{text}</p>}
    </button>
  );
};

export default Button;
