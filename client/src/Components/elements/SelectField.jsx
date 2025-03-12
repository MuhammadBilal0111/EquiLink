import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const SelectField = ({ label, placeholder, className, apiEndpoint }) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await fetch(apiEndpoint);
                const data = await response.json();
                setOptions(data?.categories || []);
            } catch (error) {
                console.error("Error fetching options:", error);
            }
        };
        fetchOptions();
    }, [apiEndpoint]);

    return (
        <div className="flex flex-col gap-3 text-white text-sm">
            <label>{label}</label>
            <Select>
                <SelectTrigger className={`bg-[#262626] rounded-[8px] h-[2rem] w-80 p-3 text-white border-none focus:ring-0 focus:outline-none shadow-none ${className}`}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="bg-[#262626] text-white border-none">
                    {options.length > 0 ? (
                        options.map((option) => (
                            <SelectItem key={option._id} value={option.name}>
                                {option.name}
                            </SelectItem>
                        ))
                    ) : (
                        <SelectItem value="loading" disabled>Loading...</SelectItem>
                    )}
                </SelectContent>
            </Select>
        </div>
    );
};

export default SelectField;
