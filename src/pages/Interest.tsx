import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { message, Button, Select } from 'antd';
import { findUser, updateUser } from '../utils/userStorage';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  '예금',
  '적금',
  '이체',
  '자산관리',
  '퇴직연금',
  '펀드',
  '신탁',
  'ISA',
  '전자금융',
  '대출',
  '외환',
  '보험',
  '카드',
  '기타',
];

const MAX_COUNT = 3;

const Interest: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleComplete = () => {
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = findUser(loggedUser);
      if (user) {
        updateUser({
          ...user,
          interests: JSON.stringify(selectedItems),
        });
        message.success('관심 분야가 저장되었습니다!');
        navigate('/');
      }
    }
  };

  const handleChange = (value: string[]) => {
    if (value.length <= MAX_COUNT) {
      setSelectedItems(value);
    } else {
      message.warning(`최대 ${MAX_COUNT}개까지 선택할 수 있습니다.`);
    }
  };

  const suffix = (
    <>
      <span>
        {selectedItems.length} / {MAX_COUNT}
      </span>
      <DownOutlined />
    </>
  );

  return (
    <div className="flex flex-col gap-16 items-center m-auto">
      <h2 className="text-2xl font-bold text-center">WOULD YOU HANA</h2>
      <div className="flex flex-col items-center gap-8 w-80">
        <p>관심 분야를 선택해 주세요!</p>

        <Select
          mode="multiple"
          value={selectedItems}
          style={{ width: '100%' }}
          onChange={handleChange}
          suffixIcon={suffix}
          placeholder="선택"
          options={CATEGORIES.map((category) => ({
            label: category,
            value: category,
          }))}
          maxTagCount="responsive"
        />

        <Button
          type="primary"
          onClick={handleComplete}
          disabled={selectedItems.length !== MAX_COUNT}
          className="mt-4"
          block
        >
          완료
        </Button>
      </div>
    </div>
  );
};

export default Interest;
