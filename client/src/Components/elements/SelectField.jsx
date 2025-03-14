// import React from "react";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";

// const SelectField = ({ label, placeholder, className }) => {
//     return (
//         <div className="flex flex-col gap-3 text-white text-sm">
//             <label>{label}</label>
//             <Select>
//                 <SelectTrigger className={`bg-[#262626] rounded-[8px] h-[2rem] w-80 p-3 text-white border-none focus:ring-0 focus:outline-none shadow-none ${className}`}>
//                     <SelectValue placeholder={placeholder} />
//                 </SelectTrigger>
//                 <SelectContent className="bg-[#262626] text-white border-none">
//                     <SelectItem value="light">Light</SelectItem>
//                     <SelectItem value="dark">Dark</SelectItem>
//                     <SelectItem value="system">System</SelectItem>
//                 </SelectContent>
//             </Select>
//         </div>
//     );
// };

// export default SelectField;


// import React, { useEffect, useState } from "react";
// import { forwardRef } from "react";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import { category } from "@/constants";

// const SelectField = forwardRef(({ label, placeholder, className}, ref) => {

//     return (
//         <div className="flex flex-col gap-3 text-white text-sm">
//             <label>{label}</label>
//             <Select>
//                 <SelectTrigger className={`bg-[#262626] rounded-[8px] h-[2rem] w-80 p-3 text-white border-none focus:ring-0 focus:outline-none shadow-none ${className}`}>
//                     <SelectValue placeholder={placeholder} />
//                 </SelectTrigger>
//                 <SelectContent className="bg-[#262626] text-white border-none">
//                     {category.length > 0 ? (
//                         category.map((option) => (
//                             <SelectItem ref={ref} value={option}>
//                                 {option}
//                             </SelectItem>
//                         ))
//                     ) : (
//                         <SelectItem value="loading" disabled>Loading...</SelectItem>
//                     )}
//                 </SelectContent>
//             </Select>
//         </div>
//     );
// });

// export default SelectField;

import React, { useState, forwardRef } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { category } from "@/constants";

const SelectField = forwardRef(({ label, placeholder, className, onChange }, ref) => {
    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = (value) => {
        setSelectedValue(value);
        if (onChange) onChange(value); // Notify parent component
    };

    return (
        <div className="flex flex-col gap-3 text-white text-sm">
            <label>{label}</label>
            <Select onValueChange={handleChange}>
                <SelectTrigger className={`bg-[#262626] rounded-[8px] h-[2rem] w-80 p-3 text-white border-none focus:ring-0 focus:outline-none shadow-none ${className}`}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="bg-[#262626] text-white border-none">
                    {category.length > 0 ? (
                        category.map((option) => (
                            <SelectItem key={option} value={option}>
                                {option}
                            </SelectItem>
                        ))
                    ) : (
                        <SelectItem value="loading" disabled>
                            Loading...
                        </SelectItem>
                    )}
                </SelectContent>
            </Select>
        </div>
    );
});

export default SelectField;

