import React from 'react';
interface Category {
  name: string;
  icon: string;
}
interface CategoryProps {
    onSelectCategory: (category: string) => void;
  }

const categories: Category[] = [
  {
    name: '전체',
    icon: '1',
  },
  {
    name: '예금/적금',
    icon: '2',
  },
  {
    name: '이체',
    icon: '3',
  },
  {
    name: '자산관리',
    icon: '4',
  },
  {
    name: '퇴직연금',
    icon: '5',
  },
  {
    name: '펀드',
    icon: '6',
  },
  {
    name: '신탁',
    icon: '7',
  },
  {
    name: 'ISA',
    icon: '8',
  },
  {
    name: '전자금융',
    icon: '9',
  },
  {
    name: '대출',
    icon: '10',
  },
  {
    name: '외환',
    icon: '11',
  },
  {
    name: '보험',
    icon: '12',
  },
  {
    name: '카드',
    icon: '13',
  },
  {
    name: '기타',
    icon: '14',
  },
];

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
          {categories.map((category, index) => (
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
                <button className='w-14 flex flex-col items-center'
                onClick={() =>{ onSelectCategory(category.name);
                }} // 카테고리 선택 시 호출
                >
                  <div
                    className="w-full h-14 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-[#DDFCD2]"
                  >
                    {category.icon}
                  </div>
                  <p className='whitespace-nowrap'>{category.name}</p>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
  );
};

export default Category;
