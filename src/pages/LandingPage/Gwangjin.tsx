import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Carousel } from 'antd';
import hanaFamilyTogether from '../../assets/img/HanaFamilyTogether.png'
import iconUser from '../../assets/img/icon_user.png';
import labelDistrict from '../../assets/img/label_district.png';
import logoGwangjin from '../../assets/img/logo_gwangjin.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../hoc/store';
// import SearchDropdown from '../../components/SearchDropdown';
import iconSearch from '../../assets/img/icon_search.png';
import '../../App.css';

// 구 플래그 컴포넌트
const GuBadge: React.FC = () => {
    return (
        <div style={guContainerStyle}>
            <img src={logoGwangjin} style={{ padding: '15px' }}></img>
        </div>
    );
};

const guContainerStyle = {
    backgroundImage: `url(${labelDistrict})`,
    backgroundSize: 'cover',
    color: '#fff',
    fontWeight: 'bold',
    padding: '0px 0', // Removed top padding by setting it to 0
    textAlign: 'center' as const,
    fontSize: '20px',
    width: '120px',
    height: '100px',
    margin: '0 auto',
    display: 'inline-block',
    lineHeight: '4',
};



const CardContent = ({ type, date, likes, views, content }: { type: string, date: string, likes: string, views: string, content: string }) => (
    <div style={{ textAlign: 'left', padding: '10px', marginTop: '10px' }}>
        <div style={{ marginTop: '10px', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#FF6F61' }}>{type}</span>
            <span style={{ fontSize: '14px', color: '#888888', marginLeft: '20px' }}> {date}</span>
        </div>
        <div style={{ fontSize: '22px', color: '#000', marginTop: '10px' }}>{content}</div>
        <div style={{ marginTop: '10px', justifyContent: 'space-between', textAlign: 'end' }}>
            <span style={{ fontSize: '14px', color: '#888888', marginRight: '20px' }}>좋아요 {likes}</span>
            <span style={{ fontSize: '14px', color: '#888888' }}>👀조회수 {views}</span>
        </div>
        <hr style={{ marginTop: '20px', color: 'black' }} />
    </div>
);

const Gwangjin: React.FC = () => {
    //const navigate = useNavigate();

    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );
    const userRole = useSelector((state: RootState) => state.auth.userRole);
    const userEmail = useSelector((state: RootState) => state.auth.userEmail);

    const [carouselIndex, setCarouselIndex] = useState(0);
    const keyword = ["전세대출", "학자금대출", "체크카드", "부동산규제"];


    const [searchSelected, setSearchSelected] = useState('Q&A'); // 카테고리 상태
    const handleCarouselChange = (current: number) => {
        setCarouselIndex(current);
    };


    useEffect(() => {
        console.log('User Role:', userRole);
        console.log('User Email:', userEmail);
        console.log('Is Authenticated:', isAuthenticated);
    }, [userRole, userEmail, isAuthenticated]);


    return (
        <div style={{ width: '100%', padding: '20 20' }}>
            <div style={{ textAlign: 'center' }}>
                <Row
                    gutter={[16, 16]}
                    style={{ backgroundColor: '#00848515', height: '600px' }}
                >
                    <Col span={12}>
                        <div style={{ marginLeft: '100px', display: 'flex', justifyContent: 'start' }}>
                            <div style={{ marginLeft: '10px' }}>
                                <GuBadge />
                            </div>
                        </div>

                        <div style={{ marginLeft: '100px' }}>
                            <img
                                src={hanaFamilyTogether}
                                alt="hanaFamilyTogether"
                                width={700}
                            />
                        </div>
                    </Col>

                    <Col span={12} style={{ alignContent: 'left', marginLeft: '0px', marginTop: '100px' }}>

                        <style>
                            {`
                                .custom-carousel .carousel-item {
                                    transition: all 0.3s ease;
                                    text-align: center;
                                    font-size: 50px;
                                    opacity: 0.5;
                                    transform: scale(0.8);
                                    cursor: pointer;
                                    height: 100px;
                                    line-height: 100px;
                                    color: #008485;
                        

                                }

                                .custom-carousel .carousel-item.focused {
                                    font-size: 50px;
                                    font-weight: bold;
                                    opacity: 1;
                                    transform: scale(1);
                                }

                                .custom-carousel {
                                    max-height: 300px;
                                    overflow: hidden;
                                }
                                `}
                        </style>
                        <strong>
                            <span style={{ fontSize: '35px' }}> 지금 <span style={{ fontSize: '50px' }}>광진구</span> 주민들은</span>
                            <div >
                                <Carousel
                                    afterChange={handleCarouselChange}
                                    vertical
                                    dots={false}
                                    className="custom-carousel"
                                    autoplay={true}
                                    autoplaySpeed={3000}

                                >
                                    {keyword.map((keyword, index) => (
                                        <span
                                            key={index}
                                            className={`carousel-item ${index === carouselIndex ? 'focused' : ''}`}
                                        >
                                            {keyword}
                                        </span>
                                    ))}
                                </Carousel>

                            </div>
                            <div style={{ fontSize: '35px', alignContent: 'center' }}>에 관심이 있어요.</div>


                        </strong>
                        <br />
                        {/* <SearchDropdown value={searchSelected} onChange={setSearchSelected} />
                        <input
                            style={{
                                width: '53%', //기존 '65%'
                                marginRight: '10px',
                                height: '55px',
                                borderRadius: '0 6px 6px 0', //기존 borderRadius: '6px'
                                padding: '8px',
                                fontFamily: 'Hana2Medium',
                                fontSize: '15px',
                                borderLeft: 'none', //추가
                            }}
                            className="border rounded-md p-2 w-full 
                                focus:outline-none focus:ring-2 focus:ring-mainColor focus:shadow-md hover:ring-2 hover:ring-mainColor transition duration-800"
                            placeholder="질문을 입력하세요."
                        ></input>
                        <button className="bg-[#008485] w-[120px] h-[55px] rounded-lg p-2 text-white text-[15px] hover:bg-[#006f6f] transition-color duration-300">
                            <div className="flex items-center justify-center">
                                <img
                                    src={iconSearch}
                                    alt="iconSearch"
                                    width={15}
                                    className="mr-1"
                                />
                                검색하기
                            </div>
                        </button> */}
                    </Col>
                </Row>
                <Row gutter={[16, 16]} style={{ backgroundColor: '#ffffff' }}>
                    <Col span={24} style={{ marginTop: '40px' }}>
                        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>

                        </h2>
                    </Col>

                    <Col xs={24} sm={8}>
                        <Card

                            title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>🔥 HOT 금융 게시물</span>}
                            style={{ textAlign: 'center', fontSize: '20px' }}
                        //onClick={() => navigate('/feature-a')}
                        >
                            <CardContent
                                type="예금/적금"
                                date="2024.10.30 10:31"
                                likes={'2.5K개'}
                                views={'21.2K회'}
                                content="광진구에서 계좌 개설 어디가 좋을까요?"
                            />
                            <CardContent
                                type="소비"
                                date="2024.10.29 09:15"
                                likes={'1.0K개'}
                                views={'12.1K회'}
                                content="광진구에서 저렴한 카페 추천 좀!"
                            />
                            <CardContent
                                type="주식"
                                date="2024.10.30 10:31"
                                likes={'2.5K개'}
                                views={'21.2K회'}
                                content="광진구 근처 주식 강의 듣고 싶어요"
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Card
                            title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>✒️ 방금 답변이 작성된 Q&A</span>}
                            style={{ textAlign: 'center' }}
                        //onClick={() => navigate('/feature-b')}
                        >
                            <CardContent
                                type="예금/적금"
                                date="2024.10.31 10:31"
                                likes={'122개'}
                                views={'1.0K회'}
                                content="청년 우대 통장 관련 문의"
                            />

                            <CardContent
                                type="카드"
                                date="2024.11.03 10:31"
                                likes={'182개'}
                                views={'2.0K회'}
                                content="적립형 체크카드 추천 부탁드려요"
                            />
                        </Card>
                    </Col>

                    <Col xs={24} sm={8}>
                        <Card
                            title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>🏆 오늘의 열혈 답변가</span>}
                            style={{ textAlign: 'center' }}
                        //onClick={() => navigate('/feature-c')}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffC0CB60', padding: '20px', borderRadius: '10px', marginBottom: '10px', marginLeft: '0px', textAlign: 'left' }}>
                                <div style={{ fontSize: '36px', marginRight: '15px' }}>🥇</div>
                                <img src={iconUser} alt="User Icon" style={{ width: '100px', height: '100px', marginRight: '15px', marginLeft: '0px' }} />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>안창살김하나</div>
                                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>LV24</div>
                                    <div style={{ fontSize: '18px' }}>활동🥁: 46</div>
                                    <div style={{ fontSize: '18px' }}>좋아요👍🏻: 89</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f6FE8060', padding: '20px', borderRadius: '10px', marginBottom: '10px', marginLeft: '0px', width: '100%', textAlign: 'left' }}>
                                <span style={{ fontSize: '36px', marginRight: '20px', lineHeight: '1' }}>🥈</span>
                                <div style={{ display: 'grid', gridTemplateColumns: '150px auto auto auto', alignItems: 'center', width: '100%', gap: '10px' }}>
                                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>별송이내꺼야</span>
                                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>LV18</span>
                                    <span style={{ fontSize: '18px' }}>활동🥁: 46</span>
                                    <span style={{ fontSize: '18px' }}>좋아요👍🏻: 89</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ADC8E650', padding: '20px', borderRadius: '10px', marginBottom: '10px', marginLeft: '0px', width: '100%', textAlign: 'left' }}>
                                <span style={{ fontSize: '36px', marginRight: '20px', lineHeight: '1' }}>🥉</span>
                                <div style={{ display: 'grid', gridTemplateColumns: '150px auto auto auto', alignItems: 'center', width: '100%', gap: '10px' }}>
                                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>최강식록</span>
                                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>LV42</span>
                                    <span style={{ fontSize: '18px' }}>활동🥁: 16</span>
                                    <span style={{ fontSize: '18px' }}>좋아요👍🏻: 24</span>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Gwangjin;
