import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card } from 'antd';
import hanaFamilyTogether from '../../assets/img/HanaFamilyTogeter.png'
import iconUser from '../../assets/img/icon_user.png'
import trendKeyword from '../../assets/img/trendKeyword.png'
import { useSelector } from 'react-redux';
import { RootState } from '../../hoc/store';

import '../../App.css';

// 구 플래그 컴포넌트
const GuBadge: React.FC = () => {
    return (
        <div style={guContainerStyle}>
            <span style={flagGuTextStyle}>광진구</span>
        </div>
    );
};

const guContainerStyle = {
    backgroundColor: '#008485',
    color: '#fff',
    fontWeight: 'bold',
    padding: '10px 0',
    textAlign: 'center' as const,
    fontSize: '20px',
    width: '120px',
    margin: '0 auto',
    display: 'inline-block',
    lineHeight: '4',
    clipPath: 'polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)', // 오각형 모양을 만들기 위한 clip-path
};

const flagGuTextStyle = {
    display: 'block',
    lineHeight: '4'
};

const CardContent = ({ type, date, likes,views, content }: { type: string, date: string, likes: string, views:string, content: string }) => (
    <div style={{ textAlign: 'left', padding:'10px',marginTop:'10px'}}>
        <div style={{ marginTop: '10px', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#FF6F61' }}>{type}</span>
            <span style={{ fontSize: '14px', color: '#888888', marginLeft:'20px' }}> {date}</span>
        </div>
        <div style={{ fontSize: '22px', color: '#000', marginTop: '10px' }}>{content}</div>
        <div style={{ marginTop: '10px', justifyContent: 'space-between', textAlign:'end' }}>
            <span style={{ fontSize: '14px', color: '#888888', marginRight:'20px'}}>좋아요 {likes}</span>
            <span style={{ fontSize: '14px', color: '#888888' }}>👀조회수 {views}</span>
        </div>
        <hr style={{marginTop:'20px', color:'black'}}/>
    </div>
);

const Gwangjin: React.FC = () => {
    //const navigate = useNavigate();

    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );
    const userRole = useSelector((state: RootState) => state.auth.userRole);
    const userEmail = useSelector((state: RootState) => state.auth.userEmail);

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
                <div style={{ marginLeft:'11px' }}>
                <GuBadge />
                </div>
            </div>

            
            <img
                src={hanaFamilyTogether}
                alt="hanaFamilyTogether"
                width={700}
            />
        </Col>

        <Col span={12} style={{ alignContent: 'left', marginLeft: '0px' }}>
            
            <h1
                style={{
                color: 'black',
                fontSize: '40px',
                lineHeight: '1.2',
                textAlign: 'left',
                }}
            >
            <strong>
                <span style={{ color: 'black', fontSize:'20px' }}> 지금 <span style={{fontSize:'30px'}}>광진구</span> 사람들은 <br/> 여기에 관심이 있어요</span>
            </strong>
            </h1>

            <img style={{marginLeft:'0px', padding:'0px '}}
                src={trendKeyword}
                alt="trendKeyword"
                width={700}
            />
            <strong>
                <span style={{ color: 'black', fontSize:'20px',textAlign:'left' }}> 오늘 광진구에서 <span style={{fontSize:'30px'}}>1,231개</span>의 질문, <span style={{fontSize:'30px'}}>210개</span>의 답변이 등록되었습니다!</span>
            </strong>
            
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
                        type="예금"
                        date="2024.10.30 10:31"
                        likes={'2.5K개'}
                        views={'21.2K회'}
                        content="일반예금 관련해서 형이 정리해줄게 들어와봐."
                    />
                    <CardContent
                        type="적금"
                        date="2024.10.29 09:15"
                        likes={'1.0K개'}
                        views={'12.1K회'}
                        content="청년 주택 드림 청약통장이 기존 청약통장과 다른 점이 무엇인가요?"
                    />
                    <CardContent
                        type="대출"
                        date="2024.10.30 10:31"
                        likes={'2.5K개'}
                        views={'21.2K회'}
                        content="만 26세 중소기업 재직 중입니다."
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
                        type="예금"
                        date="2024.10.31 10:31"
                        likes={'122개'}
                        views={'1.0K회'}
                        content="요즘 일반예금 금리가 어느 정도 되나요?"
                    />

                    <CardContent
                        type="외환"
                        date="2024.11.03 10:31"
                        likes={'182개'}
                        views={'2.0K회'}
                        content="해외에서도 금융인증서를 이용할 수 있나요??"
                    />
                </Card>
            </Col>

            <Col xs={24} sm={8}>
                <Card
                title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>🏆 오늘의 열혈 답변가</span>}
                style={{ textAlign: 'center' }}
                //onClick={() => navigate('/feature-c')}
                >
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffC0CB60', padding: '20px', borderRadius: '10px', marginBottom: '10px', marginLeft:'0px', textAlign:'left' }}>
                    <div style={{ fontSize: '36px', marginRight: '15px' }}>🥇</div>
                    <img src={iconUser} alt="User Icon" style={{ width: '100px', height: '100px', marginRight: '15px', marginLeft: '0px'}} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>안창살김하나</div>
                        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>LV24</div>
                        <div style={{ fontSize: '18px'}}>활동🥁: 46</div>
                        <div style={{ fontSize: '18px'}}>좋아요👍🏻: 89</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center',  backgroundColor: '#f6FE8060', padding: '20px', borderRadius: '10px', marginBottom: '10px', marginLeft: '0px', width: '100%', textAlign:'left' }}>
                    <span style={{ fontSize: '36px', marginRight: '20px', lineHeight: '1' }}>🥈</span>
                    <div style={{display: 'grid', gridTemplateColumns: '150px auto auto auto', alignItems: 'center', width: '100%', gap: '10px' }}>
                        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>별송이내꺼야</span>
                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>LV18</span>
                        <span style={{ fontSize: '18px' }}>활동🥁: 46</span>
                        <span style={{ fontSize: '18px' }}>좋아요👍🏻: 89</span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center',  backgroundColor: '#ADC8E650', padding: '20px', borderRadius: '10px', marginBottom: '10px', marginLeft: '0px', width: '100%',textAlign:'left' }}>
                    <span style={{ fontSize: '36px', marginRight: '20px', lineHeight: '1' }}>🥉</span>
                    <div style={{display: 'grid', gridTemplateColumns: '150px auto auto auto', alignItems: 'center', width: '100%', gap: '10px'}}>
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
);};

export default Gwangjin;
