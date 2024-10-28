import React from 'react';
import { Categories } from '../constants/posts';
interface Category {
  name: string;
  icon: string;
}
interface CategoryProps {
  onSelectCategory: (category: string) => void;
}

const categoriesWithIcon = Categories.map((category, index) => {
  return { name: category, icon: index + 1 };
});

const Category: React.FC<CategoryProps> = ({ onSelectCategory }) => {
  return (
    <div>
      <ul
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '13px 0px',
          padding: 0,
          listStyle: 'none',
        }}
      >
        {categoriesWithIcon.map((category, index) => (
          <li key={index}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                fontWeight: '400',
                fontSize: '15px',
              }}
            >
              <button
                className="w-14 flex flex-col items-center"
                onClick={() => {
                  onSelectCategory(category.name);
                }} // 카테고리 선택 시 호출
              >
                <div className="w-full h-14 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-[#DDFCD2]">
                  {category.icon}
                </div>
                <p className="whitespace-nowrap">{category.name}</p>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
