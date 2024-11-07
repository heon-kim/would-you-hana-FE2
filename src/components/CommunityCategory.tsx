import React from 'react';
import { Tabs } from 'antd';

interface CommunityCategoryProps {
  setCategory: (category: string) => void;
}

const CommunityCategory: React.FC<CommunityCategoryProps> = ({ setCategory }) => {
  const categories = [
    { label: '전체', key: '전체'},
    { label: '주식', key: '주식'},
    { label: '소비', key: '소비'},
    { label: '저축', key: '저축'},
    { label: '청약', key: '청약'},
    { label: '연말정산', key: '연말정산'},
    { label: '금융', key: '금융'},
    { label: '노후 대비', key: '노후 대비'},
    { label: '절약', key: '절약'},
    { label: '신용점수 올리기', key: '신용점수 올리기'},
    { label: '세금/납부', key: '세금/납부'},
    { label: '학자금대출', key: '학자금대출'},
    
  ];

  return (
    <Tabs
      defaultActiveKey="전체"
      onChange={setCategory}
      items={categories.map(category => ({
        label: category.label,
        key: category.key,
      }))}
    />
  );
};

export default CommunityCategory;
