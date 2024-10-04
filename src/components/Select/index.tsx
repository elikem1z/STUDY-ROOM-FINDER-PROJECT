import React from "react";

const Select = ({ options, value, onChange }) => {
    return (
        <select value={value} onChange={onChange}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default Select;
