import React, { useState } from 'react';
import { Layout, Row, Col, Button, Card, Input, Upload } from 'antd';
import {
  HeartOutlined,
  MessageOutlined,
  CommentOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import star4 from '../../assets/img/stars/star4.png';
import BankerCard from '../../components/BankerCard';
import banker2 from '../../assets/img/banker2.png';
import banker3 from '../../assets/img/banker3.png';
import banker4 from '../../assets/img/banker4.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../hoc/store';
import type { UploadProps } from 'antd/es/upload';
import { findBanker } from '../../utils/userStorage';

const { Content } = Layout;

interface BankerProps {
  photo: string | null;
  name: string;
  tags: string[];
  intro: string;
}

const CustomerProfile: React.FC = () => {
  return (
    <Layout style={{ padding: '24px', backgroundColor: '#FFFFFF' }}>
      <Content style={{ backgroundColor: '#FFFFFF', padding: '24px' }}>
        {/* 내 정보 및 이 주의 활약 */}
        <Row gutter={[16, 16]} style={{ display: 'flex', minHeight: '240px' }}>
          <Col span={12}>
            <Card
              title={<div style={{ textAlign: 'left' }}>내 정보</div>} // 제목을 왼쪽 정렬
              bordered={false}
              style={{ backgroundColor: '#F0F0F0', height: '100%' }}
            >
              <div style={{ textAlign: 'center', fontSize: '20px' }}>
                <p style={{ margin: '10px 0' }}>
                  <HeartOutlined /> 좋아요: <span id="likes-count">999+</span>
                </p>
                <p style={{ margin: '10px 0' }}>
                  <MessageOutlined /> 답변 수:{' '}
                  <span id="answers-count">999+</span>
                </p>
                <p style={{ margin: '10px 0' }}>
                  <CommentOutlined /> 댓글 수:{' '}
                  <span id="comments-count">999+</span>
                </p>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              title={<div style={{ textAlign: 'left' }}>이 주의 활약</div>}
              bordered={false}
              style={{ backgroundColor: '#F0F0F0', height: '100%' }}
            >
              <div className="flex justify-center">
                <img className="h-40" src={star4} alt="star4" />
              </div>
            </Card>
          </Col>
        </Row>

        {/* 나에게 답변해준 은행원 */}
        <Card
          title="나에게 답변해 준 행원"
          bordered={false}
          style={{
            backgroundColor: '#FFFFFF',
            textAlign: 'left',
            margin: '40px 0',
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <BankerCard
                name="홍 창 기"
                title="PM"
                description="주택 청약을 도와드리는 홍창기 차장 입니다. 많이 알고 있다고 생각하지만 실제로 보면 헷갈리는 주택청약에 대해서 알려드립니다."
                tags={['주택청약', '내집마련 더블업 적금', '주택청약종합저축']}
                imageUrl={banker2}
                branch="대리 - 하나가족 성동구 성수점"
              />
            </Col>
            <Col span={8}>
              <BankerCard
                name="강 백 호"
                title="RM"
                description="고객님의 입출금 통장을 책임지는 강백호 과장입니다. 어려운 금융 용어를 쉽고 정확하게 전달하여 고객님의 자산을 관리할 수 있도록 최선을 다하겠습니다.."
                tags={['주택청약', '내집마련 더블업 적금', '주택청약종합저축']}
                imageUrl={banker3}
                branch="대리 - 하나가족 광진구 군자역점"
              />
            </Col>
            <Col span={8}>
              <BankerCard
                name="문 보 경"
                title="RM"
                description="고객님의 대출을 책임지는 문보경 대리입니다. 광진구 신자양점에서 고객님의 아주 작은 고민까지도 하나만의 대출 솔루션으로 해결해 드리겠습니다."
                tags={['대출', '주택담보대출', '전세대출']}
                imageUrl={banker4}
                branch="대리 - 하나가족 광진구 신자양점"
              />
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};

const BankerProfile: React.FC = () => {
  const userEmail = useSelector((state: RootState) => state.auth.userEmail);
  const [user, setUser] = useState(findBanker(userEmail)); // TODO: 이 부분 업데이트 하기

  // 저장된 프로필 상태
  const [savedProfile, setSavedProfile] = useState<BankerProps>({
    photo: banker3, // 기본 이미지 URL
    name: user.name,
    tags: ['주택청약', '대출'],
    intro: '안녕하세요. 주택청약 전문가입니다.',
  });

  // 편집 상태
  const [isComposing, setIsComposing] = useState(false); // IME 조합 상태
  const [editableProfile, setEditableProfile] = useState(savedProfile);
  const [newTag, setNewTag] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // 태그 추가
  const addTag = () => {
    if (newTag && !editableProfile.tags.includes(newTag.trim())) {
      setEditableProfile({
        ...editableProfile,
        tags: [...editableProfile.tags, newTag.trim()],
      });
      setNewTag('');
    }
  };

  // 태그 삭제
  const removeTag = (removedTag: string) => {
    setEditableProfile({
      ...editableProfile,
      tags: editableProfile.tags.filter((tag) => tag !== removedTag),
    });
  };

  // 사진 업로드
  const handlePhotoUpload: UploadProps['customRequest'] = (options) => {
    const { file, onSuccess, onError } = options;

    const reader = new FileReader();
    reader.onload = () => {
      setEditableProfile({
        ...editableProfile,
        photo: reader.result as string,
      });
      onSuccess?.('ok');
    };
    reader.onerror = (error) => {
      console.error('파일 읽기 중 오류:', error);
      onError?.(new Error('File upload failed'));
    };
    reader.readAsDataURL(file as Blob);
  };

  // 저장
  const saveProfile = () => {
    setSavedProfile(editableProfile);
    setIsEditing(false);
  };

  return (
    <Layout style={{ padding: '50px', backgroundColor: '#FFFFFF' }}>
      <Content style={{ width: '100%', marginBottom:'16px', padding:'24px', borderRadius:'24px' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>프로필</h3>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'start' }}>
          {/* 이미지 섹션 */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div>
              <img
                src={isEditing ? editableProfile.photo : savedProfile.photo}
                alt="profile"
              />
              {isEditing && !editableProfile.photo && (
                <Upload
                  accept="image/*"
                  showUploadList={false}
                  customRequest={handlePhotoUpload}
                >
                  <Button icon={<UploadOutlined />}>사진 업로드</Button>
                </Upload>
              )}
            </div>
            {isEditing && (
              <Button
                size="small"
                style={{ width: '100px' }}
                onClick={() =>
                  setEditableProfile({ ...editableProfile, photo: null })
                }
              >
                사진 삭제
              </Button>
            )}
          </div>

          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {/* 이름 섹션 */}
            <div>
              <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>이름</h4>
              <Input
                value={savedProfile.name}
                readOnly
                style={{
                  backgroundColor: '#f5f5f5',
                  cursor: 'not-allowed',
                  fontSize: '16px',
                }}
              />
            </div>

            {/* 태그 섹션 */}
            <div>
              <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>태그</h4>

              {isEditing && (
                <div
                  style={{ display: 'flex', marginBottom: '16px', gap: '8px' }}
                >
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onCompositionStart={() => setIsComposing(true)} // IME 시작 (한글 처리 에러 방지하기 위해 설정)
                    onCompositionEnd={() => setIsComposing(false)} // IME 종료
                    onPressEnter={() => {
                      if (!isComposing) {
                        addTag();
                      }
                    }}
                    placeholder="새 태그 추가"
                  />
                  <Button type="primary" onClick={addTag}>
                    추가
                  </Button>
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                {(isEditing ? editableProfile.tags : savedProfile.tags).map(
                  (tag, index) => (
                    <Button
                      key={index}
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
                      {isEditing && (
                        <span onClick={() => removeTag(tag)}>x</span>
                      )}
                    </Button>
                  )
                )}
              </div>
            </div>

            {/* 자기소개 섹션 */}
            <div>
              <h4
                style={{
                  fontWeight: 'bold',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                자기소개
              </h4>
              {isEditing ? (
                <Input.TextArea
                  value={editableProfile.intro}
                  onChange={(e) =>
                    setEditableProfile({
                      ...editableProfile,
                      intro: e.target.value,
                    })
                  }
                  rows={4}
                />
              ) : (
                <p
                  style={{
                    backgroundColor: '#f5f5f5',
                    padding: '10px',
                    borderRadius: '4px',
                  }}
                >
                  {savedProfile.intro}
                </p>
              )}
            </div>

            {/* 저장/수정 버튼 */}
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              {isEditing ? (
                <Button
                  size="large"
                  style={{ width: '100px' }}
                  block
                  onClick={saveProfile}
                >
                  저장하기
                </Button>
              ) : (
                <Button
                  size='large'
                  style={{ width: '100px' }}
                  block
                  onClick={() => setIsEditing(true)}
                >
                  수정하기
                </Button>
              )}
            </div>
          </div>
        </div>
      </Content>
      <Content>
        {/* 내 정보 및 이 주의 활약 */}
        <div style={{ display: 'flex', gap:'30px' }}>
            <div
              style={{ width:'100%', backgroundColor:'#f5f5f5', padding:'24px', borderRadius:'24px' }}
            >
              <div style={{ fontSize:'16px', fontWeight:'bold', marginBottom:'15px' }}>내 정보</div>
              <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                <p>
                  <HeartOutlined /> 도움돼요: <span id="likes-count">53개</span>
                </p>
                <p>
                  <MessageOutlined /> 답변 수:
                  <span id="answers-count">5개</span>
                </p>
                <p>
                  <CommentOutlined /> 댓글 수:
                  <span id="comments-count">34개</span>
                </p>
              </div>
            </div>
            <div
              style={{ width:'100%', backgroundColor:'#f5f5f5', padding:'24px', borderRadius:'24px' }}
            >
              <div style={{ fontSize:'16px', fontWeight:'bold'}}>이 주의 활약</div>
              <div className="flex justify-center">
                <img className="h-40" src={star4} alt="star4" />
              </div>
            </div>
        </div>
      </Content>
    </Layout>
  );
};

const Profile: React.FC = () => {
  const userRole = useSelector((state: RootState) => state.auth.userRole);

  return <>{userRole == 'C' ? <CustomerProfile /> : <BankerProfile />}</>;
};

export default Profile;
