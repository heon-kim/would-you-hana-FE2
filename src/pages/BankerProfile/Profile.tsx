import React from 'react';
import { Card, Col, Row, Button, List, Typography } from 'antd';
import { PhoneFilled, DesktopOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { hashtagLinks, mainProfile, bankerImages } from '../../constants/bankerProfile';
import BankerCards from '../../components/BankerCards';
const { Title, Text } = Typography;

const Profile: React.FC = () => {

    return (
        <div className="w-full px-[15%] py-5">
             <h1 className="text-2xl font-bold mb-6">하나가족 소개</h1>
            {/* Main Profile and Q&A Section */}
            <Row gutter={16} className="flex">
                <Col span={16} className="flex flex-col">
                    <Card className="flex-grow rounded-2xl border border-[#d3d3d3]" bodyStyle={{ padding: 0 }}>
                        <Row>
                            <div className="w-full bg-mainColor text-right text-white py-2.5 rounded-t-2xl px-5">
                                대리 - 하나가족 광진구 신자양점
                            </div>
                            <img src={bankerImages.banker1} alt="Profile" className="w-full mb-5" />
                        </Row>
                        <Row>
                            <Col span={24} className="px-5">
                                <Row justify="space-between" align="middle" className="mb-2.5">
                                    <Title level={4}>{mainProfile.name}</Title>
                                    <Text className="text-[#5E616E]">{mainProfile.title}</Text>
                                </Row>
                                <div className="mb-2.5">
                                    {mainProfile.hashTag.map(hashTag => (
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
                                <hr/>
                                <div className="my-5 text-base font-light">{mainProfile.description}</div>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                {/* Q&A and Contact Section */}
                <Col span={8} className="flex flex-col">
                    <List 
                        header={<Text strong>베스트 Q&A</Text>}
                        bordered
                        dataSource={[
                            '주택 담보 대출은 얼마나 어렵게 해야 하나요?',
                            '대출 한도는 현재 시세가 왜 중요한가요?',
                            '신용 점수가 전세 대출에서 왜 중요한가요?',
                        ]}
                        renderItem={item => <List.Item>🎯 {item}</List.Item>}
                        className="mb-0 rounded-2xl"
                    />

                    <Card className="mb-2.5 rounded-2xl border border-[#d3d3d3] mt-2.5" bodyStyle={{ padding: 15 }}>
                        <div>
                            <div className="mb-2.5 font-bold">상담시간</div>
                            <Text>🕐 평일 10:00 - 18:00 (주말 및 공휴일 제외)</Text>
                        </div>
                    </Card>

                    <Card className="flex text-center justify-center mb-2.5 rounded-2xl border border-[#d3d3d3]" bodyStyle={{ padding: 15 }}>
                        <div className="mb-2.5">
                            <div className="text-2xl font-bold">
                                <span className="text-mainColor">우주</span>하나
                                <span className="text-mainColor"> 하나</span>가족
                            </div>
                            <br />
                            <Text >우주하나 Q&A 서비스를 통해</Text><br />
                            <Text >고객님들에게 금융 관련 답변을 제공합니다.</Text><br />
                            <br />
                            <span className="text-xl mr-5">
                                {<PhoneFilled />}
                            </span>
                            <span>고객센터: 1599-1111, 1588-1111</span><br />
                            <span>(개인 0-4번, 법인 0-5번)</span><br />
                        </div>
                    </Card>

                    <Button 
                        onClick={() => window.open('https://www.kebhana.com/cont/customer/customer02/index.jsp', "_blank")} 
                        icon={<DesktopOutlined />} 
                        type="primary" 
                        block 
                        className="mb-2.5 py-7 rounded-2xl"
                    >
                        PC 화면 원격 상담하기
                    </Button>
                    <Button 
                        icon={<ClockCircleOutlined />} 
                        type="default" 
                        block 
                        className="mb-2.5 py-7 bg-black text-white rounded-2xl"
                    >
                        원하는 시간에 상담 예약하기
                    </Button>
                </Col>
            </Row>

            {/* Similar Specialists Section */}
            <div className="mt-7">
                <h1 className="text-2xl font-bold mb-6">같은 지점</h1>
                <BankerCards></BankerCards>
            </div>
           
        </div>
    );
};

export default Profile;