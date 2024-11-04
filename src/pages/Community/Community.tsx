import React, { useEffect, useState } from 'react';
import IconAnnouncement from '../../assets/img/icon_announcement.png'
import IconWouldYouHana from '../../assets/img/would_you_hana.png'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Divider, List, Skeleton } from 'antd';

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
      fetch("https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo")
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
        id="scrollableDiv"
        style={{
          height: 'auto',
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 50}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
          style={{ width: '100%', paddingLeft: '15%', paddingRight: '15%' }}
        >
          <div className='flex'>
        <div style={{ width: '100%'}}>
          <div
            style={{
              backgroundColor: '#E0FFD1',
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              padding: '15px',
            }}
          >
            <div
              style={{
              width:'60%',
                height: '150px',
                alignContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'center',
                gap: '10px',
                marginLeft:'10px'
              }}
            >
              <p style={{ color: '#4F4F4F', fontWeight: 'bold' }}>
                우리 동네 최근 소식!
              </p>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
                <span className='text-mainColor'>광진구</span> 행복주택 분양공고
                OPEN
              </h1>
              <p style={{ color: '#4F4F4F', fontWeight: 'bold' }}>보러가기 &gt;</p>
            </div>
            <div style={{width:'30%', alignItems:'center', justifyContent:'center', display:'flex'}}>
              <img src={IconAnnouncement}
              style={{width:'170px'}}/>
              </div>
              <div style={{width:'20%', alignItems:'end', justifyContent:'end', justifyItems:'center',padding:'15px', display:'flex'}}>
                  <img
                  src={IconWouldYouHana}
                  style={{width:'120px'}}/>
              </div>
          </div>
          {/* <CommunityPostList/> */}
        </div>
      </div>
  
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.email}>
                <List.Item.Meta
                  avatar={<Avatar src={item.picture.large} />}
                  title={<a href="https://ant.design">{item.name.last}</a>}
                  description={item.email}
                />
                <div>Content</div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    );
  };
export default Community;
