import React from 'react'

const TextArea = ({ label, placeholder , className}) => {
  return (
    <div className="flex flex-col gap-3 text-white text-sm">
      <label>{label}</label>
      <textarea placeholder={placeholder} rows="3" className={`bg-[#262626] rounded-[8px] w-115 mb-3 p-3 ${className}`} ></textarea>
    </div>
  );
}

export default TextArea