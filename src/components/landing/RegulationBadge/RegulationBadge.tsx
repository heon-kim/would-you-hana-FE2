import React from 'react';
import labelRegulation from '../../../assets/img/label_regulation.png';

const RegulationBadge: React.FC = () => {
  return (
    <div 
      className="w-[120px] h-[100px] inline-block text-center text-xl font-bold text-white py-2"
      style={{ 
        backgroundImage: `url(${labelRegulation})`,
        backgroundSize: 'cover'
      }}
    >
      <span className="block leading-6">
        부동산 <br />규제지역
      </span>
    </div>
  );
};

export default RegulationBadge; 