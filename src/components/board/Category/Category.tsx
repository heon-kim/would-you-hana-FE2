import React, { useState, useCallback } from 'react';
import { Categories } from '../../../constants/posts';
import IconViewAll from '../../../assets/img/category/icon_view_all.png';
import IconDeposit from '../../../assets/img/category/icon_deposit_saving.png';
import IconTransfer from '../../../assets/img/category/icon_transfer.png';
import IconAssetManagement from '../../../assets/img/category/icon_asset_management.png';
import IconRetirementPension from '../../../assets/img/category/icon_retirement_pension.png';
import IconFund from '../../../assets/img/category/icon_fund.png';
import IconTrust from '../../../assets/img/category/icon_trust.png';
import IconISA from '../../../assets/img/category/icon_isa.png';
import IconMobileBanking from '../../../assets/img/category/icon_mobile_banking.svg';
import IconLoan from '../../../assets/img/category/icon_loan.png';
import IconForeignExchange from '../../../assets/img/category/icon_foreign_exchange.png';
import IconInsurance from '../../../assets/img/category/icon_insurance.png';
import IconCard from '../../../assets/img/category/icon_card.png';
import IconETC from '../../../assets/img/category/icon_etc.png';

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
  IconETC,
];

const categoriesWithIcon = ['전체', ...Categories].map((category, index) => ({
  name: category,
  icon: categoryIcons[index % categoryIcons.length]
}));

const Category: React.FC<CategoryProps> = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  }, [onSelectCategory]);

  return (
    <div>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-y-3">
        {categoriesWithIcon.map((category, index) => (
          <li key={index}>
            <div className="flex flex-col items-center justify-center text-sm font-normal">
              <button
                className="w-14 flex flex-col items-center"
                onClick={() => handleCategorySelect(category.name)}
              >
                <div className={`w-full h-14 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                  selectedCategory === category.name
                    ? 'bg-[#DFF7DC]'
                    : 'bg-gray-100 hover:bg-[#F0F0F0]'
                }`}>
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-8 h-8"
                  />
                </div>
                <p className={`whitespace-nowrap ${
                  selectedCategory === category.name
                    ? 'text-[#26B064]'
                    : 'text-black'
                }`}>
                  {category.name}
                </p>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category; 