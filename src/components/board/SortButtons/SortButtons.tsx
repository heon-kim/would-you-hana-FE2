import React from 'react';

interface SortButtonsProps {
  sortOrder: string;
  onSortChange: (order: string) => void;
}

const SORT_OPTIONS = ['최근 답변순', '최신순', '인기순'];

const SortButtons: React.FC<SortButtonsProps> = ({ sortOrder, onSortChange }) => {
  return (
    <div className="flex justify-end items-center">
      <div className="flex space-x-3 items-end text-sm">
        {SORT_OPTIONS.map((order) => (
          <button
            key={order}
            onClick={() => onSortChange(order)}
            className={`${
              sortOrder === order 
                ? 'font-bold text-black' 
                : 'font-normal text-gray-500'
            }`}
          >
            {order}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortButtons; 