import React from 'react';
 
type SelectInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
};
 
const SelectInput: React.FC<SelectInputProps> = ({ value, onChange, options }) => {
  return (
    <select value={value} onChange={onChange}>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
 
export default SelectInput;