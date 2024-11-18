import React from 'react';
import { Card, Col, Row, Button, List, Typography } from 'antd';
import { PhoneFilled, DesktopOutlined, ClockCircleOutlined } from '@ant-design/icons';
import banker1 from '../../assets/img/banker1.png'
import banker2 from '../../assets/img/banker2.png'
import banker3 from '../../assets/img/banker3.png'
import banker4 from '../../assets/img/banker4.png'
const { Title, Text } = Typography;

const Profile: React.FC = () => {
    const mainProfile = {
        name: '문 보 경',
        title:'RM',
        hashTag: ['#대출', '#주택담보대출', '#전세대출'],
        description: '고객님의 대출을 책임지는 문보경 대리입니다. 광진구 신자양점에서 고객님의 아주 작은 고민까지도 하나만의 대출 솔루션으로 해결해 드리겠습니다.',
    };

    const specialists = [
        { name: '홍창기', title: 'PM', hashTag: ['#주택청약', '#내집마련 더블업 적금', '#주택청약종합저축'], description: '주택 청약을 도와드리는 홍창기 차장입니다. 많이 알고 있다고 생각하지만 실제로 보면 헷갈리는 주택청약에 대해서 알려드립니다.',image: banker2 },
        { name: '박해민', title: 'RM', hashTag: ['#적금','#청년희망적금', '#급여하나 월복리 적금'], description: '내 돈을 관리한다는 마음으로 관리해 드리는 박해민 대리입니다. 지금 고객님께 필요한 적금 방법 꼼꼼하게 알려드려요!',image: banker3 },
        { name: '강백호', title: 'RM', hashTag: ['#입출금','#달달 하나', '#주거래 하나', '#연금 하나'], description: '부동산 자산 관리 전문가로서 고객님의 재산을 안전하게 관리해 드립니다.',image: banker4 },
    ];

    // 해시태그에 대한 링크를 맵핑하는 객체
    const hashtagLinks = {
        '#대출': 'https://www.kebhana.com/cont/mall/mall08/mall0805/index.jsp?catId=spb_2821,spb_2822,spb_2823,spb_2824,spb_2825,spb_2826&_menuNo=98786',
        '#주택담보대출': 'https://www.kebhana.com/cont/mall/mall08/mall0805/index.jsp?catId=spb_2821,spb_2822,spb_2823,spb_2824,spb_2825,spb_2826&_menuNo=98786',
        '#전세대출': 'https://www.kebhana.com/cont/mall/mall08/mall0805/index.jsp?catId=spb_2821,spb_2822,spb_2823,spb_2824,spb_2825,spb_2826&_menuNo=98786',
        '#주택청약': 'https://www.kebhana.com/cont/mall/mall08/mall0801/mall080102/1455802_115157.jsp',
        '#내집마련 더블업 적금': 'https://www.kebhana.com/cont/mall/mall08/mall0801/mall080102/1450446_115157.jsp',
        '#주택청약종합저축': 'https://www.kebhana.com/cont/mall/mall08/mall0801/mall080102/1419695_115157.jsp',
        '#적금': 'https://www.kebhana.com/cont/mall/mall08/mall0805/index.jsp?_menuNo=62608',
        '#청년희망적금': 'https://www.kebhana.com/cont/news/news01/1480227_115430.jsp?_menuNo=98835',
        '#급여하나 월복리 적금': 'https://www.kebhana.com/cont/mall/mall08/mall0801/mall080102/1455929_115157.jsp',
        '#압출금': 'https://www.kebhana.com/transfer/index.do',
        '#달달 하나': 'https://www.kebhana.com/cont/mall/mall08/mall0801/mall080103/1497693_115188.jsp',
        '#주거래 하나': 'https://www.kebhana.com/cont/mall/mall08/mall0801/mall080102/1455927_115157.jsp',
        '#연금 하나': 'https://www.kebhana.com/cont/mall/mall08/mall0801/mall080103/1455931_115188.jsp',
    };

    return (
        <div style={{ width: '100%',
            paddingLeft: '15%',
            paddingRight: '15%',
            marginTop: '20px',}}>
            {/* Main Profile and Q&A Section */}
            <Row gutter={16} style={{ display: 'flex' }}>
            <Col span={16} style={{ display: 'flex', flexDirection: 'column' }}>
                <Card style={{ flexGrow: 1, borderRadius: '20px', border: '1px solid #d3d3d3' }} bodyStyle={{ padding: 0 }}>
                    <Row>
                        <div style={{ width: '100%', backgroundColor: '#008485', textAlign: 'right', color: 'white', paddingTop: '10px', paddingBottom: '10px', borderTopRightRadius: '20px', borderTopLeftRadius: '20px', paddingRight: '20px', fontSize:'20px' }}>
                            대리 - 하나가족 광진구 신자양점
                        </div>
                        <img src={banker1} alt="Profile" style={{ width: '100%', marginBottom: '20px',borderTopRightRadius: '20px', borderTopLeftRadius: '20px' }} />
                    </Row>
                    <Row>
                        <Col span={24} style={{ padding: '0 20px' }}>
                        <Row justify="space-between" align="middle" style={{ marginBottom: '10px' }}>
                            <Title level={4} style={{ fontSize: '25px', margin: 0 }}>{mainProfile.name}</Title>
                            <Text style={{ fontSize: '20px', color: '#5E616E' }}>{mainProfile.title}</Text>
                        </Row>
                            <div style={{ marginBottom: '10px' }}>
                                {mainProfile.hashTag.map(hashTag => (
                                    <Button
                                    key={hashTag}
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
                                    <a href={hashtagLinks[hashTag]} target="_blank" rel="noopener noreferrer" style={{ color: '#008485' }}>
                                        {hashTag}
                                    </a>
                                </Button>
                                ))}
                            </div>
                            <hr/>
                            <div style = {{fontSize:'20px', marginTop:'20px', marginBottom:'20px', fontWeight:'lighter'}}>{mainProfile.description}</div>
                        </Col>
                    </Row>
                </Card>
            </Col>

                {/* Q&A and Contact Section */}
                <Col span={8} style={{ display: 'flex', flexDirection: 'column' }}>
                    <List 
                        header={<Text strong style={{ fontSize: '15px' }}>베스트 Q&A</Text>}
                        bordered
                        dataSource={[
                            '주택 담보 대출은 얼마나 어렵게 해야 하나요?',
                            '대출 한도는 현재 시세가 왜 중요한가요?',
                            '신용 점수가 전세 대출에서 왜 중요한가요?',
                        ]}
                        renderItem={item => <List.Item style={{ fontSize: '15px' }}>🎯 {item}</List.Item>}
                        style={{ marginBottom: '0px', borderRadius:'20px'}}
                    />

                    <Card style={{ marginBottom: '10px', borderRadius:'20px', border:'1px solid #d3d3d3', marginTop:'10px'  }} bodyStyle={{ padding: 15 }}>
                        <div>
                            <div style={{ fontSize: '15px', marginBottom: '10px'}}><strong>상담시간</strong></div>
                            <Text style={{ fontSize: '15px' }}>🕐 평일 10:00 - 18:00 (주말 및 공휴일 제외)</Text>
                        </div>
                    </Card>

                    <Card style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', marginBottom: '10px', borderRadius:'20px', border:'1px solid #d3d3d3' }} bodyStyle={{ padding: 15 }}>
                        <div style={{ marginBottom: '10px' }}>
                            <div style={{ fontSize: '40px', fontWeight: 'bold' }}>
                                <span style={{ color: '#008485' }}>우주</span>하나
                                <span style={{ color: '#008485' }}> 하나</span>가족
                            </div>
                            <br />
                            <Text style={{ fontSize: '15px'}}>우주하나 Q&A 서비스를 통해</Text><br />
                            <Text style={{ fontSize: '15px'}}>고객님들에게 금융 관련 답변을 제공합니다.</Text><br />
                            <br />
                            <span style={{ fontSize: '20px', marginRight: '20px' }}>
                                {<PhoneFilled />}
                            </span>
                            <span style={{ fontSize: '15px' }}>고객센터: 1599-1111, 1588-1111</span><br />
                            <span style={{ fontSize: '15px' }}>(개인 0-4번, 법인 0-5번)</span><br />
                        </div>
                    </Card>

                    <Button onClick={() => window.open('https://www.kebhana.com/cont/customer/customer02/index.jsp', "_blank")} icon={<DesktopOutlined />} type="primary" block style={{ marginBottom: '10px', padding: '30px', fontSize: '15px', borderRadius:'20px' }}>PC 화면 원격 상담하기</Button>
                    <Button icon={<ClockCircleOutlined />} type="default" block style={{ marginBottom: '10px', padding: '30px', fontSize: '15px', backgroundColor: 'black', color: 'white', borderRadius:'20px' }}>원하는 시간에 상담 예약하기</Button>
                </Col>
            </Row>

            {/* Similar Specialists Section */}
            <div style={{ marginTop: '30px' }}>
                <div style={{fontSize:'30px', marginBottom:'20px'}}>같은 지점 전문가</div>
                <Row gutter={16}>
                    {specialists.map(specialist => (
                        <Col span={8} key={specialist.name}>
                            <Card style={{ borderRadius: '20px', border: '1px solid #d3d3d3' }} bodyStyle={{ padding: 0 }}>
                                <Row>
                                    <img src={specialist.image} alt="Specialist" style={{ width: '100%', marginBottom: '20px',borderTopRightRadius: '20px', borderTopLeftRadius: '20px' }} />
                                </Row>
                                <Row>
                                    <Col span={24} style={{ padding: '0 20px' }}>
                                    <Row justify="space-between" align="middle" style={{ marginBottom: '10px' }}>
                                        <Title level={4} style={{ fontSize: '25px', margin: 0 }}>{specialist.name}</Title>
                                        <Text style={{ fontSize: '20px', color: '#5E616E' }}>{specialist.title}</Text>
                                    </Row>
                                        <div style={{ marginBottom: '10px' }}>
                                            {specialist.hashTag.map(hashTag => (
                                                <Button
                                                    key={hashTag}
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
                                                <a href={hashtagLinks[hashTag]} target="_blank" rel="noopener noreferrer" style={{ color: '#008485' }}>
                                                    {hashTag}
                                                </a>
                                                </Button>
                                            ))}
                                        </div>
                                        <hr />
                                        <div style={{ fontSize: '20px', marginTop: '20px', marginBottom:'20px', fontWeight:'lighter' }}>{specialist.description}</div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default Profile;