import React from 'react';

interface SearchDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ value, onChange }) => {
  return (
    <select
      style={{
        width: '12%',
        // marginRight: '5px',
        height: '55px',
        borderRadius: '6px 0 0 6px', //borderRadius: '6px',
        padding: '8px',
        fontFamily: 'Hana2Medium',
        fontSize: '15px',
        border: '1px solid #ddd',
        borderRight: 'none', //추가
      }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="Q&A">Q&A</option>
      <option value="커뮤니티">커뮤니티</option>
    </select>
  );
};

export default SearchDropdown;