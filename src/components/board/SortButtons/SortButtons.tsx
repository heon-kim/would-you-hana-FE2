import React from 'react';

interface SortButtonsProps {
  sortOrder: string;
  onSortChange: (order: string) => void;
}

const SORT_OPTIONS = [
  { value: 'latest', label: '최신순' },
  { value: 'good', label: '도움돼요순' }
];

const SortButtons: React.FC<SortButtonsProps> = ({ sortOrder, onSortChange }) => {
  return (
    <div className="flex justify-end items-center">
      <div className="flex space-x-3 items-end text-sm">
        {SORT_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onSortChange(value)}
            className={`${
              sortOrder === value 
                ? 'font-bold text-black' 
                : 'font-normal text-gray-500'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortButtons; 