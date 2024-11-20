import React, { useState } from 'react';
import { Layout, Button, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import banker3 from '../../assets/img/banker3.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../hoc/store';
import type { UploadProps } from 'antd/es/upload';
import { findBanker, saveBanker } from '../../utils/userStorage';

const { Content } = Layout;

interface BankerProp {
  email: string;
  password: string;
  name: string;
  branchName: string;
  interests: string[];
  photo?: string;
  desc: string;
}

const BankerInfo: React.FC = () => {
  const userEmail = useSelector((state: RootState) => state.auth.userEmail);
  const bankerProfile = userEmail ? findBanker(userEmail) : undefined;

  // interface Banker의 interests를 string으로 지정해둬서 아래 처리를 함
  // 추후 Banker의 interests를 string[]으로 업데이트하면 아래 처리 제거할 수 있음
  // ============
  // 기본값 처리
  const defaultProfile: BankerProp = {
    email: '',
    password: '',
    name: '알 수 없음',
    branchName: '알 수 없는 지점',
    interests: [],
    photo: banker3, // 기본 이미지
    desc: '금융 관련 도움을 드립니다.',
  };

  // bankerProfile을 안전하게 처리
  const processedProfile = {
    ...defaultProfile, // 기본값
    ...bankerProfile, // 실제 데이터로 덮어쓰기
    photo: banker3, // 기본 이미지
    desc: '안녕하세요. 금융이 어려운 고객님께 도움을 드리고 있습니다.',
    interests: JSON.parse(bankerProfile?.interests || '') || [], // interests가 문자열인 경우 JSON.parse
  };
  // ============

  const [savedProfile, setSavedProfile] =
    useState<BankerProp>(processedProfile);

  // 편집 상태
  const [isComposing, setIsComposing] = useState(false); // IME 조합 상태
  const [editableProfile, setEditableProfile] = useState(savedProfile);
  const [newTag, setNewTag] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // 태그 추가
  const addTag = () => {
    if (newTag && !editableProfile.interests.includes(newTag.trim())) {
      setEditableProfile({
        ...editableProfile,
        interests: [...editableProfile.interests, newTag.trim()],
      });
      setNewTag('');
    }
  };

  // 태그 삭제
  const removeTag = (removedTag: string) => {
    setEditableProfile({
      ...editableProfile,
      interests: editableProfile.interests.filter((tag) => tag !== removedTag),
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
    // TODO: 사진 저장 안되는 이슈 있음.
    saveBanker({
      ...savedProfile,
      interests: JSON.stringify(savedProfile.interests),
    });
    setIsEditing(false);
  };

  return (
    <Content
      style={{
        width: '100%',
        marginBottom: '24px',
      }}
    >
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
          <div
            style={{
              marginBottom: '20px',
              textAlign: 'center',
              border: '1px dashed #d9d9d9',
              borderRadius: '8px',
              height: '200px',
              width: '100%',
              maxWidth: '400px',
              margin: '0 auto',
              backgroundImage: `url(${
                isEditing ? editableProfile.photo : savedProfile.photo
              })`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
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
                setEditableProfile({ ...editableProfile, photo: undefined })
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
              {(isEditing
                ? editableProfile.interests
                : savedProfile.interests
              ).map((tag, index) => (
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
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTag(tag);
                      }}
                    >
                      x
                    </span>
                  )}
                </Button>
              ))}
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
                value={editableProfile.desc}
                onChange={(e) =>
                  setEditableProfile({
                    ...editableProfile,
                    desc: e.target.value,
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
                {savedProfile.desc}
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
                size="large"
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
  );
};

export default BankerInfo;
