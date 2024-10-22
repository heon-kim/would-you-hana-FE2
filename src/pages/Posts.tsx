import React from 'react';
import { Card, Col, Row, Avatar } from 'antd';

const postsData = [
  {
    id: 1,
    title: '첫 번째 게시글',
    content: '이것은 첫 번째 게시글의 내용입니다. 내용을 추가할 수 있습니다.',
  },
  {
    id: 2,
    title: '두 번째 게시글',
    content: '이것은 두 번째 게시글의 내용입니다. 더 많은 정보를 여기에 추가하세요.',
  },
  {
    id: 3,
    title: '세 번째 게시글',
    content: '세 번째 게시글의 내용이 여기에 들어갑니다. 추가 설명을 작성하세요.',
  },
];

const Posts: React.FC = () => {
  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>게시글 목록</h2>
      <Row gutter={[16, 16]}>
        {postsData.map((post) => (
          <Col span={8} key={post.id}>
            <Card title={post.title} bordered={false} hoverable>
              <p>{post.content}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Posts;
