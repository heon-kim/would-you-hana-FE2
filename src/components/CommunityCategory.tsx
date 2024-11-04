import React from 'react';
import { Tabs } from 'antd';

interface CommunityCategoryProps {
  setCategory: (category: string) => void;
}

const CommunityCategory: React.FC<CommunityCategoryProps> = ({ setCategory }) => {
  const categories = [
    { label: '전체', key: '전체', content: '전체 내용입니다.' },
    { label: '저축', key: '저축', content: '저축 관련 내용입니다.' },
    { label: '청약', key: '청약', content: '청약 관련 내용입니다.' },
    { label: '대출', key: '대출', content: '대출 관련 내용입니다.' },
    { label: '금융', key: '금융', content: '금융 관련 내용입니다.' },
    { label: '소비', key: '소비', content: '소비 관련 내용입니다.' },
    { label: '주식', key: '주식', content: '주식 관련 내용입니다.' },
  ];

  return (
    <Tabs
      defaultActiveKey="저축"
      onChange={setCategory}
      items={categories.map(category => ({
        label: category.label,
        key: category.key,
      }))}
    />
  );
};

export default CommunityCategory;
