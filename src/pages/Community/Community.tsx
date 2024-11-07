import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Divider, List, message, Skeleton } from 'antd';
import CommunityNotice from '../../components/CommunityNotice';
import ImgBank from '../../assets/img/img_community3.jpg';
import ImgBank2 from '../../assets/img/img_community2.png';
import IconPencil from '../../assets/img/icon_pencil.svg';
import CommunityCategory from '../../components/CommunityCategory';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../../hoc/request';
import { Post } from '../../constants/posts';

// interface DataType {
//   category: string;
//   title: string;
//   content: string;
//   author: string;
//   views: number;
//   likes: number;
//   comments: number;
//   image: boolean;
// }

const Community: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const navigate = useNavigate();

  const handleRegisterButton = () => {
    const isLoggedIn = getAuthToken();
    if (isLoggedIn === 'null' || !isLoggedIn) {
      message.warning('로그인이 필요합니다.');
      navigate('/login');
    } else {
      navigate('/community/regist');
    }
  };

  const loadMoreData = () => {
    if (loading) return;
    setLoading(true);

    setData((prevData) => {
      const nextData = data.slice(prevData.length, prevData.length + 5);
      if (nextData.length === 0) setHasMore(false);
      return [...prevData, ...nextData];
    });

    setLoading(false);
  };

  useEffect(() => {
    // 로컬 스토리지에서 데이터 불러오기
    const storedData = localStorage.getItem('community_posts');
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      // 로컬 스토리지에 데이터가 없을 경우 기본 게시물 데이터 저장
      localStorage.setItem('community_posts', JSON.stringify([]));
    }
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
        <div style={{ marginTop: '15px', marginBottom: '15px', alignItems: 'center', justifyContent: 'end', display: 'flex' }}>
          <button 
            onClick={handleRegisterButton}
            style={{borderRadius: '5px', backgroundColor: '#008485', color: 'white', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '15px'}}
          >
            글쓰기
            <img
              src={IconPencil}
              alt='iconPencil'
              width={20}
              style={{ marginLeft: '5px' }}
            />
          </button>
        </div>
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
                        style={{ width: '80px', height: '80px' }}
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
                    <span className="text-mainColor">조회 {item.counts.views}</span> ·
                    좋아요 {item.counts.likes} · 댓글 {item.counts.comments}
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
