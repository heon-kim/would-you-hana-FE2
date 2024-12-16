import React from 'react';
import { Card, Row, Col, Button, Typography } from 'antd';

const { Title, Text } = Typography;

interface BankerCardProps {
  name: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  branch: string;
}

const BankerCard: React.FC<BankerCardProps> = ({ name, title, description, tags, imageUrl }) => {
  return (
    <Card style={{ flexGrow: 1, borderRadius: '20px', border: '1px solid #d3d3d3' }} bodyStyle={{ padding: 0 }}>
      <Row>
        <img
          src={imageUrl}
          alt="Profile"
          style={{
            width: '100%',
            marginBottom: '20px',
            borderTopRightRadius: '20px',
            borderTopLeftRadius: '20px',
          }}
        />
      </Row>
      <Row>
        <Col span={24} style={{ padding: '0 20px' }}>
          <Row justify="space-between" align="middle" style={{ marginBottom: '10px' }}>
            <Title level={4} style={{ fontSize: '25px', margin: 0 }}>
              {name}
            </Title>
            <Text style={{ fontSize: '20px', color: '#5E616E' }}>{title}</Text>
          </Row>
          <div style={{ marginBottom: '10px' }}>
            {tags.map((tag) => (
              <Button
                key={tag}
                type="primary"
                ghost
                style={{
                  marginRight: '8px',
                  marginBottom: '8px',
                  backgroundColor: '#F7FDFD',
                  fontSize: '12px',
                  padding: '10px',
                }}
              >
                #{tag}
              </Button>
            ))}
          </div>
          <hr />
          <div style={{ fontSize: '20px', marginTop: '20px', marginBottom: '20px', fontWeight: 'lighter' }}>
            {description}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default BankerCard;
