import React from "react";
export default function SelectInput({ options = [],selected=0,valuecol="",namecol="", placeholder='', className = '', ...props }) {
    return (
        <select
            {...props}
            value={selected}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className}
        >
            <option>{placeholder}</option>
            {options.map((item,index) => (
                valuecol && namecol ? 
                <option key={item[valuecol]} value={item[valuecol]}>{item[namecol]}</option>
                : <option key={item} value={item}>{item}</option>
            ))}
        </select>
    );
}