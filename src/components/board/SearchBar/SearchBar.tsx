import React from 'react';
import { Input } from 'antd';

interface SearchBarProps {
  searchText: string;
  onSearch: (value: string) => void;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchText,
  onSearch,
  onChange,
}) => {
  return (
    <div className="flex justify-center mb-6">
      <Input.Search
        placeholder="검색어를 입력하세요."
        allowClear
        onSearch={onSearch}
        onChange={(e) => onChange(e.target.value)}
        value={searchText}
        enterButton
        size="large"
        className="w-4/5"
      />
    </div>
  );
};

export default SearchBar; 