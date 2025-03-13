import React from 'react'
import { forwardRef } from 'react';

const TextArea = forwardRef(({ label, placeholder , className}, ref) => {
  return (
    <div className="flex flex-col gap-3 text-white text-sm">
      <label>{label}</label>
      <textarea placeholder={placeholder} ref={ref} rows="3" className={`bg-[#262626] rounded-[8px] w-115 mb-3 p-3 ${className}`} ></textarea>
    </div>
  );
});

export default TextArea