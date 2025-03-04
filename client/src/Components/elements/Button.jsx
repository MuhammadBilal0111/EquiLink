import React from "react";

const Button = ({ name, handler, className }) => {
    return (
        <button 
        onClick={handler} 
        className={`py-1.5 text-white text-center text-sm rounded-lg w-80 bg-gradient-to-r from-[#D1B0D4] via-[#8B68AD] to-[#5A3592] cursor-pointer ${className}`}
      >
        {name}
      </button>
      
      
    );
  };
  

export default Button;
