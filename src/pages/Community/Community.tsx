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
  const [columnCount, setColumnCount] = useState(2);

  // 화면 너비에 따라 열 개수를 조정하는 함수
  const updateColumnCount = () => {
    const width = window.innerWidth;
    if (width < 1340) {
      setColumnCount(1); // 작은 화면에서는 한 줄에 1개
    } else {
      setColumnCount(2); // 큰 화면에서는 한 줄에 2개
    }
  };

  useEffect(() => {
    updateColumnCount();
    window.addEventListener('resize', updateColumnCount);
    return () => window.removeEventListener('resize', updateColumnCount);
  }, []);

  const handlePostClick = (postId: number) => {
    navigate(`detail/${postId}`);
  };

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
      : data.filter((post) => post.category === selectedCategory);

  const truncateTitle = (title: string) => {
    if(columnCount == 1){
      return title;
    }
    return title.length > 20 ? title.substring(0, 23) + '...' : title;
  };
  const truncateContent = (content: string) => {
    if(columnCount == 1){
      return content.length > 80 ? content.substring(0,85) + '...' : content;
    }
    return content.length > 26 ? content.substring(0, 30) + '...' : content;
  };

  return (
    <div
      id='scrollableDiv'
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
        scrollableTarget='scrollableDiv'
        style={{ width: '100%', paddingLeft: '15%', paddingRight: '15%' }}
      >
        <CommunityNotice />
        <div
          style={{
            marginTop: '15px',
            marginBottom: '15px',
            alignItems: 'center',
            justifyContent: 'end',
            display: 'flex',
          }}
        >
          <button
            onClick={handleRegisterButton}
            style={{
              borderRadius: '5px',
              backgroundColor: '#008485',
              color: 'white',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: '15px',
            }}
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
          grid={{ gutter: 0, column: columnCount }}
          dataSource={data}
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
                ...(columnCount === 2 && index % 2 === 0
                  ? { borderRight: '1px solid rgba(140, 140, 140, 0.35)' }
                  : {}),
              }}
              onClick={() => handlePostClick(item.id)}
            >
              <div className='p-3'>
                <div className='flex align-center justify-center'>
                  <div className='flex flex-col w-4/5 text-start justify-start gap-2'>
                    <p className='text-sm text-gray-500'>{item.category}</p>
                    <h1 style={{ fontSize: '18px', fontWeight: 'bold' }}>
                      {truncateTitle(item.title)}
                    </h1>
                    <h3 style={{ fontSize: '15px' }}>
                      {truncateContent(item.content)}
                    </h3>
                  </div>
                  <div className='w-1/5 flex justify-center mt-5'>
                    {/* {item.image && ( */}
                    <img
                      src={index % 2 === 0 ? ImgBank : ImgBank2}
                      style={{ width: '80px', height: '80px' }}
                      alt='User Icon'
                    />
                    {/* )} */}
                  </div>
                </div>
                <p>{item.author}</p>
                <div className='flex gap-3'>
                  <p
                    className='text-gray-500 mb-4'
                    style={{ fontSize: '13px' }}
                  >
                    <span className='text-mainColor'>
                      조회 {item.counts.views}
                    </span>{' '}
                    · 좋아요 {item.counts.likes} · 댓글 {item.counts.comments}
                  </p>
                </div>
              </div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default Community;
