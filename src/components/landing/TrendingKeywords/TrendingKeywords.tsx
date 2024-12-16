import React from 'react';
import { Carousel } from 'antd';

interface TrendingKeywordsProps {
  keywords: string[];
  carouselIndex: number;
  onCarouselChange: (current: number) => void;
  districtName: string;
}

const TrendingKeywords: React.FC<TrendingKeywordsProps> = ({
  keywords,
  carouselIndex,
  onCarouselChange,
  districtName
}) => {
  return (
    <div className="flex flex-col justify-center items-end mr-[150px] mt-0">
      <span className="text-4xl font-extrabold">
        지금 <span className="text-5xl font-extrabold">{districtName}</span> 주민들은
      </span>
      <div className="flex items-center justify-center">
      <style>
              {`
                .custom-carousel .carousel-item {
                    transition: all 0.3s ease;
                    text-align: center;
                    font-size: 50px;
                    opacity: 0.5;
                    transform: scale(0.8);
                    cursor: pointer;
                    height: 100px;
                    line-height: 100px;
                    color: #008485;
                }

                .custom-carousel .carousel-item.focused {
                    font-size: 50px;
                    font-weight: 800;
                    opacity: 1;
                    transform: scale(1);
                }

                .custom-carousel {
                    max-height: 300px;
                    overflow: hidden;
                }
                `}
            </style>
        <Carousel
          afterChange={onCarouselChange}
          vertical
          dots={false}
          className="custom-carousel w-[300px]"
          autoplay
          autoplaySpeed={2800}
        >
          {keywords.map((keyword, index) => (
            <span
              key={index}
              className={`carousel-item ${
                index === carouselIndex ? 'focused' : ''
              }`}
            >
              {keyword}
            </span>
          ))}
        </Carousel>
        <p className="text-4xl font-extrabold">
          에 관심이 있어요.
        </p>
      </div>
    </div>
  );
};

export default TrendingKeywords; 