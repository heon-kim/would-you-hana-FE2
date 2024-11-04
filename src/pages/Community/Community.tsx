import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Divider, List, Skeleton } from 'antd';
import CommunityNotice from '../../components/CommunityNotice';
import IconUser from '../../assets/img/icon_user.png';

interface DataType {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

const Community: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      'https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo'
    )
      .then((res) => res.json())
      .then((body) => {
        setData((prevData) => [...prevData, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div
      id='scrollableDiv'
      style={{
        height: 'auto',
        overflow: 'auto',
        padding: '0 16px',
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget='scrollableDiv'
        style={{ width: '100%', paddingLeft: '15%', paddingRight: '15%'}}
      >
        <CommunityNotice />
        <List
          grid={{ gutter: 0, column: 2 }} // Set gutter to 0 for no spacing
          style={{gap:'0px'}}
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item
              key={item.email}
              style={{
                width: '100%',
                height: 'auto',
                padding: '3px', // Remove padding to avoid gaps
                margin:'0',
                position: 'relative',
                borderBottom: '1px solid rgba(140, 140, 140, 0.35)', // Add horizontal divider
              }}
            >
              <div className="p-3">
                <div className='flex align-center justify-center'>
                  <div className='flex flex-col w-3/4 text-start justify-start gap-2'>
                    <h1 className='font-bold text-xl'>제목</h1>
                    <h3 className='text-base'>내용</h3>
                  </div>
                  <div className='w-1/4 flex justify-center'>
                    <img src={IconUser} style={{ width: '90px'}} />
                  </div>
                </div>
                <p>작성자</p>
                <div className='flex gap-3'>
                  <p className="text-gray-500 mb-4" style={{ fontSize: '12px' }}>
                    <span className="text-mainColor">조회 11</span>{' '}
                    · 도움돼요 7 · 댓글 2
                  </p>
                </div>
                {/* No need for a separate horizontal divider */}
              </div>
              {/* Vertical Divider (only on even indexes for a grid layout) */}
              {index % 2 === 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '0.8px',
                    height: '100%',
                    justifyContent:'center',
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
