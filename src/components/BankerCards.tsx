import { Card, Col, Row, Button, Typography } from 'antd';
import { hashtagLinks, specialists } from '../constants/bankerProfile';
const { Title, Text } = Typography;


const BankerCard = () => {
    return (
        <Row gutter={16}>
            {specialists.map(specialist => (
                <Col span={8} key={specialist.name}>
                    <Card className="rounded-2xl border border-[#d3d3d3]" bodyStyle={{ padding: 0 }}>
                        <Row>
                            <img src={specialist.image} alt="Specialist" className="w-full mb-5 rounded-t-2xl" />
                        </Row>
                        <Row className='min-h-64'>
                            <Col span={24} className="px-5">
                                <Row justify="space-between" align="middle" className="mb-2.5">
                                    <Title level={4} >{specialist.name}</Title>
                                    <Text className="text-[#5E616E]">{specialist.title}</Text>
                                </Row>
                                <div className="mb-2.5 min-h-20">
                                    {specialist.hashTag.map(hashTag => (
                                        <Button
                                            key={hashTag}
                                            type="primary"
                                            ghost
                                            className="mr-2 mb-2 bg-[#F7FDFD] text-xs p-2.5"
                                        >
                                            <a href={hashtagLinks[hashTag]} target="_blank" rel="noopener noreferrer" className="text-mainColor">
                                                {hashTag}
                                            </a>
                                        </Button>
                                    ))}
                                </div>
                                <hr />
                                <div className="my-5 text-base font-light">{specialist.description}</div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default BankerCard;