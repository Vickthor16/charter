import React from 'react';
 
type SearchInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};
 
const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
 
export default SearchInput;