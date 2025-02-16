import React from "react";

const Select = ({ options, value, onChange, className = "" }) => {
    return (
        <select className={className} value={value} onChange={onChange}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default Select;
