import React from 'react';
import labelDistrict from '../../../assets/img/label_district.png';

interface DistrictBadgeProps {
  logoSrc: string;
  padding?: string;
  marginTop?: string;
}

const DistrictBadge: React.FC<DistrictBadgeProps> = ({ 
  logoSrc, 
  padding = 'p-4',
  marginTop = 'mt-0' 
}) => {
  return (
    <div 
      className="w-[120px] h-[100px] inline-block leading-[4] text-center text-xl font-bold text-white"
      style={{ 
        backgroundImage: `url(${labelDistrict})`,
        backgroundSize: 'cover'
      }}
    >
      <img
        src={logoSrc}
        alt="district logo"
        className={`${padding} ${marginTop}`}
      />
    </div>
  );
};

export default DistrictBadge; 