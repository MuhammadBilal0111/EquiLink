import React, { forwardRef } from "react";

const InputField = forwardRef(({ label, placeholder , type, className}, ref) => {
  return (
    <div className="flex flex-col gap-3 text-white text-sm">
      <label>{label}</label>
      <input ref={ref} type={type} placeholder={placeholder} className={`bg-[#262626] rounded-[8px] h-[2rem] w-80 mb-3 p-3 ${className}`} />
    </div>
  );
});

export default InputField;
