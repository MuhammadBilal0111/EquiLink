import React, { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { category } from "@/constants";

const SelectField = ({ label, className, onChange, includeAll = false }) => {
    const [selectedValue, setSelectedValue] = useState(includeAll ? "All" : category[0] || "");

    const handleChange = (value) => {
        setSelectedValue(value);
        if (onChange) onChange(value);
    };

    return (
        <div className="flex flex-col gap-3 text-white text-sm">
            <label>{label}</label>
            <Select onValueChange={handleChange} value={selectedValue}>
                <SelectTrigger className={`bg-[#262626] rounded-[8px] h-[2rem] w-80 p-3 text-white border-none focus:ring-0 focus:outline-none shadow-none ${className}`}>
                    <SelectValue>{selectedValue}</SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-[#262626] text-white border-none">
                    {includeAll && <SelectItem value="All">All</SelectItem>}
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
};

export default SelectField;
