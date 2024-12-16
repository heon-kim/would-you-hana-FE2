import React from 'react';
import { Card } from 'antd';

interface CardContentProps {
  type: string;
  date: string;
  likes: string;
  views: string;
  content: string;
}

const CardContent: React.FC<CardContentProps> = ({
  type,
  date,
  likes,
  views,
  content
}) => (
  <div className="text-left p-3 mt-3">
    <div className="mt-3 justify-between">
      <span className="font-bold text-[#FF6F61]">{type}</span>
      <span className="text-gray-500 ml-5">{date}</span>
    </div>
    <div className="text-black mt-3">{content}</div>
    <div className="mt-3 justify-between text-right">
      <span className="text-gray-500 mr-5">좋아요 {likes}</span>
      <span className="text-gray-500">조회수 {views}</span>
    </div>
    <hr className="mt-5" />
  </div>
);

interface PopularCardProps {
  title: string;
  contents: CardContentProps[];
}

const PopularCard: React.FC<PopularCardProps> = ({ title, contents }) => {
  return (
    <Card
      title={<span className="font-bold">{title}</span>}
      className="text-center"
    >
      {contents.map((content, index) => (
        <CardContent key={index} {...content} />
      ))}
    </Card>
  );
};

export default PopularCard; 