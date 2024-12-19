import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Divider, List, message, Skeleton } from 'antd';
import { getAuthToken } from '../../hoc/request';
import { Post } from '../../types/post';
import CommunityNotice from '../../components/board/CommunityNotice/CommunityNotice';
import CommunityCategory from '../../components/board/Category/CommunityCategory';
import ImgBank from '../../assets/img/img_community3.jpg';
import ImgBank2 from '../../assets/img/img_community2.png';
import IconPencil from '../../assets/img/icon_pencil.svg';
import { communityService } from '../../services/community.service';
import { CommunityListDTO } from '../../types/dto/community.dto';

const Community: React.FC = () => {
  const userLocation = localStorage.getItem('userLocation');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CommunityListDTO[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await communityService.getCommunityList(userLocation); // location이 필요한 경우 state로 처리 가능
        setData(Array.isArray(response.data) ? response.data : []); // 배열 여부 확인
        setHasMore(Array.isArray(response) && response.length > 0);
        console.log('data ------------------', data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        message.error('게시물을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = useCallback((postId: number) => {
    navigate(`detail/${postId}`);
  }, [navigate]);

  const handleRegisterButton = useCallback(() => {
    const isLoggedIn = getAuthToken();
    if (isLoggedIn === 'null' || !isLoggedIn) {
      message.warning('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
    navigate('regist');
  }, [navigate]);

  const loadMoreData = useCallback(() => {
    if (loading) return;
    setLoading(true);

    setData((prevData) => {
      const nextData = data.slice(prevData.length, prevData.length + 5);
      if (nextData.length === 0) setHasMore(false);
      return [...prevData, ...nextData];
    });

    setLoading(false);
  }, [loading, data]);

  const truncateText = useCallback((text: string, maxLength: number) => {
    // if (columnCount === 1) return text;
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  }, []);

  console.log('selected cat', selectedCategory);
  console.log(data);
  const filteredData = selectedCategory === '전체'
    ? data
    : data.filter((post) => post.categoryName === selectedCategory);

  const renderListItem = useCallback((item: CommunityListDTO, index: number) => (
    <List.Item
      key={item.postId}
      className={`w-full h-auto p-0.5 m-0 relative border-b border-[rgba(140,140,140,0.35)] 
        `}
        style={{
          borderBottom: '1px solid rgba(140, 140, 140, 0.35)', // 구분선 스타일 추가
          paddingBottom:'15px'
        }}
      onClick={() => handlePostClick(item.postId)}
    >
      <div className="p-3">
        <div className="flex items-center justify-center">
          <div className="flex flex-col w-4/5 text-start justify-start gap-2">
            <p className="text-sm text-gray-500">{item.categoryName}</p>
            <h1 className="text-lg font-bold">
              {truncateText(item.title, 23)}
            </h1>
            <h3 className="text-base">
              {/* {truncateText(item.content, maxlength === 1 ? 85 : 30)} */}
            </h3>
          </div>
          <div className="w-1/5 flex justify-center mt-5">
            <img
              src={index % 2 === 0 ? ImgBank : ImgBank2}
              className="w-20 h-20"
              alt="Post"
            />
          </div>
        </div>
        <p>{item.nickname}</p>
        <div className="flex gap-3">
          <p className="text-sm text-gray-500">
            <span className="text-mainColor">조회 {item.viewCount}</span>
            {' · '}좋아요 {item.likeCount}
            {/* {' · '}댓글 {item.counts.comments} */}
          </p>
        </div>
      </div>
    </List.Item>
  ), [1, handlePostClick, truncateText]);

  return (
    <div id="scrollableDiv" className="h-auto overflow-auto px-4 mt-5">
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
        className="w-full px-[15%]"
      >
        <CommunityNotice />
        <div className="mt-4 mb-4 flex items-center justify-end">
          <button
            onClick={handleRegisterButton}
            className="rounded bg-mainColor text-white px-4 py-2.5 flex items-center"
          >
            글쓰기
            <img src={IconPencil} alt="Write" className="w-5 ml-1" />
          </button>
        </div>
        <CommunityCategory setCategory={setSelectedCategory} />

        <List
          grid={{ gutter: 0, column: 1 }}
          dataSource={filteredData}
          renderItem={renderListItem}
        />
      </InfiniteScroll>
    </div>
  );
};

export default Community;
