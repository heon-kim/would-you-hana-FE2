import React from 'react';

interface TermsCheckboxProps {
  isChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ isChecked, onChange }) => {
  return (
    <div className="flex items-center mt-5">
      <input
        type="checkbox"
        id="agree"
        className="mr-2.5"
        checked={isChecked}
        onChange={onChange}
      />
      <label htmlFor="agree" className="text-sm">
        개인정보 처리 방침에 동의합니다.
      </label>
    </div>
  );
};

export default TermsCheckbox; 