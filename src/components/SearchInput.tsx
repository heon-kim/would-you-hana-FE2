import React, { useState } from 'react';
import iconSearch from '../assets/img/icon_search.png';

interface SearchInputProps {
  onSearch: (category: string, query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [searchSelected, setSearchSelected] = useState('Q&A'); // 드롭다운 상태
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태

  // 검색 버튼 클릭 시 실행될 함수
  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchSelected, searchQuery);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '40px'}}>
      {/* 드롭다운을 SearchInput 내에 포함 */}
      <select
        style={{
          width: '20%',
          height: '55px',
          borderRadius: '6px 0 0 6px',
          padding: '8px',
          fontFamily: 'Hana2Medium',
          fontSize: '15px',
          border: '1px solid #ddd',
          borderRight: 'none',
        }}
        value={searchSelected}
        onChange={(e) => setSearchSelected(e.target.value)}
      >
        <option value="Q&A">Q&A</option>
        <option value="커뮤니티">커뮤니티</option>
      </select>

      {/* 검색 입력 필드 */}
      <input
        style={{
          width: '83%',
          marginRight: '10px',
          height: '55px',
          borderRadius: '0 6px 6px 0',
          padding: '8px',
          fontFamily: 'Hana2Medium',
          fontSize: '15px',
          borderLeft: 'none',
        }}
        className="border rounded-md p-2 w-full 
          focus:outline-none focus:ring-2 focus:ring-mainColor focus:shadow-md hover:ring-2 hover:ring-mainColor transition duration-800"
        placeholder="질문을 입력하세요."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* 검색 버튼 */}
      <button
        onClick={handleSearch}
        className="bg-[#008485] w-[120px] h-[55px] rounded-lg p-2 text-white text-[15px] hover:bg-[#006f6f] transition-color duration-300"
      >
        <div className="flex items-center justify-center">
          <img
            src={iconSearch}
            alt="iconSearch"
            width={15}
            className="mr-1"
          />
          검색하기
        </div>
      </button>
    </div>
  );
};

export default SearchInput;
