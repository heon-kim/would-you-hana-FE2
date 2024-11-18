import React from 'react';
import { Categories } from '../constants/posts';
import IconViewAll from '../assets/img/category/icon_view_all.png';
import IconDeposit from '../assets/img/category/icon_deposit_saving.png';
import IconTransfer from '../assets/img/category/icon_transfer.png';
import IconAssetManagement from '../assets/img/category/icon_asset_management.png';
import IconRetirementPension from '../assets/img/category/icon_retirement_pension.png';
import IconFund from '../assets/img/category/icon_fund.png';
import IconTrust from '../assets/img/category/icon_trust.png';
import IconISA from '../assets/img/category/icon_isa.png';
import IconMobileBanking from '../assets/img/category/icon_mobile_banking.svg';
import IconLoan from '../assets/img/category/icon_loan.png';
import IconForeignExchange from '../assets/img/category/icon_foreign_exchange.png';
import IconInsurance from '../assets/img/category/icon_insurance.svg';
import IconCard from '../assets/img/category/icon_card.png';
import IconETC from '../assets/img/category/icon_etc.png';

interface Category {
  name: string;
  icon: string;
}
interface CategoryProps {
  onSelectCategory: (category: string) => void;
}

const categoryIcons = [
  IconViewAll,
  IconDeposit,
  IconTransfer,
  IconAssetManagement,
  IconRetirementPension,
  IconFund,
  IconTrust,
  IconISA,
  IconMobileBanking,
  IconLoan,
  IconForeignExchange,
  IconInsurance,
  IconCard,
  IconETC
]

const categoriesWithIcon = ['전체', ...Categories].map((category, index) => {
  return { name: category, icon: categoryIcons[index % categoryIcons.length] };
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
                <div className="w-full h-14 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-[#DDFCD2] transition-colors duration-300">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-8 h-8"
                  />
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
