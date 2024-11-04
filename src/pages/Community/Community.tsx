import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Divider, List, Skeleton } from 'antd';
import CommunityNotice from '../../components/CommunityNotice';
import IconUser from '../../assets/img/icon_user.png';
import ImgBank from '../../assets/img/img_community3.jpg';
import ImgBank2 from '../../assets/img/img_community2.png';
import CommunityCategory from '../../components/CommunityCategory';

interface DataType {
  category: string;
  title: string;
  content: string;
  author: string;
  views: number;
  likes: number;
  comments: number;
  image: boolean;
}

// Predefined post data
const postData: DataType[] = [
  {
    category: '금융',
    title: '광진구에서 계좌 개설 어디가 좋을까요?',
    content:
      '광진구 근처에서 계좌 개설할 수 있는 은행 추천 부탁드려요. 새로 시작하는 이자 높은 상품 있으면 알려주세요.',
    author: '김둘리',
    views: 27,
    likes: 8,
    comments: 8,
    image: false,
  },
  {
    category: '소비',
    title: '광진구에서 저렴한 카페 추천 좀!',
    content:
      '광진구에서 분위기 좋고 가격도 괜찮은 카페 찾고 있어요. 추천해 주세요!',
    author: '안창살김하나',
    views: 16,
    likes: 3,
    comments: 5,
    image: false,
  },
  {
    category: '주식',
    title: '광진구 사람들 주식 어디서 많이 하나요?',
    content:
      '광진구 사는 분들 주식 투자할 때 주로 사용하는 앱이나 플랫폼 뭐예요? 추천 좀 해주세요.',
    author: '나폴리맛피자',
    views: 15,
    likes: 6,
    comments: 2,
    image: true,
  },
  {
    category: '대출',
    title: '광진구에서 학자금 대출 받기 쉬운 곳?',
    content:
      '대학생인데 학자금 대출 받으려는데 광진구 근처에서 상담 잘 해주는 곳 있나요?',
    author: '광진고릴라',
    views: 15,
    likes: 2,
    comments: 4,
    image: false,
  },
  {
    category: '소비',
    title: '광진구 배달 맛집 리스트 좀!',
    content:
      '광진구에서 배달 맛집 추천 부탁드려요. 혼밥하기 좋은 곳도 알려주시면 감사!',
    author: '광진구오함마',
    views: 9,
    likes: 3,
    comments: 6,
    image: false,
  },
  {
    category: '금융',
    title: '광진구에서 적금 상품 괜찮은 곳?',
    content: '광진구 근처에 이율 높은 적금 상품 있는 은행 추천 부탁드려요.',
    author: '금융핑',
    views: 9,
    likes: 6,
    comments: 8,
    image: true,
  },
  {
    category: '주식',
    title: '광진구 근처 주식 강의 듣고 싶어요',
    content: '주식 공부하고 싶은데 광진구 근처에 주식 강의 해주는 곳 있을까요?',
    author: '밥플러스최고',
    views: 17,
    likes: 7,
    comments: 2,
    image: false,
  },
  {
    category: '대출',
    title: '광진구에서 대출 금리 낮은 곳 추천',
    content: '신용 대출 받으려고 하는데 광진구 근처 금리 낮은 은행 있나요?',
    author: '우주우주',
    views: 17,
    likes: 3,
    comments: 8,
    image: false,
  },
  {
    category: '대출',
    title: '광진구에서 대출 금리 낮은 곳 추천',
    content: '신용 대출 받으려고 하는데 광진구 근처 금리 낮은 은행 있나요?',
    author: '호이호이',
    views: 17,
    likes: 3,
    comments: 2,
    image: false,
  },
  {
    category: '소비',
    title: '광진구 데이트하기 좋은 카페',
    content:
      '분위기 좋은 카페 찾고 있어요. 광진구에서 괜찮은 곳 추천 좀 부탁드립니다!',
    author: '빙화만두',
    views: 17,
    likes: 3,
    comments: 8,
    image: false,
  },
  {
    category: '금융',
    title: '광진구 주택청약 정보 좀 알려주세요',
    content:
      '광진구 거주 중인데 주택청약 알아보고 있어요. 정보 공유 부탁드립니다.',
    author: '홍시',
    views: 17,
    likes: 3,
    comments: 8,
    image: false,
  },
];

const Community: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const loadMoreData = () => {
    if (loading) return;
    setLoading(true);

    setData((prevData) => {
      const nextData = postData.slice(prevData.length, prevData.length + 5);
      if (nextData.length === 0) setHasMore(false);
      return [...prevData, ...nextData];
    });

    setLoading(false);
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  const filteredData =
    selectedCategory === '전체'
      ? data
      : data.filter(post => post.category === selectedCategory);

  const truncateContent = (content: string) => {
    return content.length > 20 ? content.substring(0, 26) + '...' : content;
  };

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 'auto',
        overflow: 'auto',
        padding: '0 16px',
        marginTop: '20px',
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
        style={{ width: '100%', paddingLeft: '15%', paddingRight: '15%' }}
      >
        <CommunityNotice />
        <div style={{ marginBottom: '20px' }}></div>
        <CommunityCategory setCategory={setSelectedCategory} />

        <List
          grid={{ gutter: 0, column: 2 }}
          style={{ gap: '0px' }}
          dataSource={filteredData}
          renderItem={(item, index) => (
            <List.Item
              key={index}
              style={{
                width: '100%',
                height: 'auto',
                padding: '3px',
                margin: '0',
                position: 'relative',
                borderBottom: '1px solid rgba(140, 140, 140, 0.35)',
              }}
            >
              <div className="p-3">
                <div className="flex align-center justify-center">
                  <div className="flex flex-col w-3/4 text-start justify-start gap-2">
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <h1 className="font-bold text-xl">{item.title}</h1>
                    <h3 className="text-base">
                      {truncateContent(item.content)}
                    </h3>
                  </div>
                  <div className="w-1/4 flex justify-center">
                    {item.image && (
                      <img
                        src={index % 2 === 0 ? ImgBank : ImgBank2}
                        style={{ width: '80px' }}
                        alt="User Icon"
                      />
                    )}
                  </div>
                </div>
                <p>{item.author}</p>
                <div className="flex gap-3">
                  <p
                    className="text-gray-500 mb-4"
                    style={{ fontSize: '12px' }}
                  >
                    <span className="text-mainColor">조회 {item.views}</span> ·
                    도움돼요 {item.likes} · 댓글 {item.comments}
                  </p>
                </div>
              </div>
              {index % 2 === 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '0.8px',
                    height: '100%',
                    backgroundColor: 'rgba(140, 140, 140, 0.35)',
                  }}
                />
              )}
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default Community;