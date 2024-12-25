import React, { useEffect, useState } from 'react';
import { Layout, Button, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../hoc/store';
import type { UploadProps } from 'antd/es/upload';
import { BankerMyPageReturnDTO } from '../../types/dto/banker.dto';
import { myPageService } from '../../services/mypage.service';

const { Content } = Layout;


const BankerInfo: React.FC = () => {
  const { userId } = useSelector((state: RootState) => state.auth);
  const [bankerProfile, setBankerProfile] = useState<BankerMyPageReturnDTO>({
    name:'김하나',
    branchName:'성동지점',
    specializations:['이체'],
    content:'안녕하세요.',
    filePath:'',
    totalGoodCount:0,
    totalCommentCount:0,
    totalViewCount:0
  });

  useEffect(() => {
    const fetchBankerInfo = async () => {
      const response = await myPageService.getBankerMyPage(Number(userId));
      setBankerProfile(response.data);
    }
    fetchBankerInfo();
  }, [userId]);


  const [savedProfile, setSavedProfile] = useState<BankerMyPageReturnDTO>(bankerProfile);

  // 편집 상태
  const [isComposing, setIsComposing] = useState(false); // IME 조합 상태
  const [editableProfile, setEditableProfile] = useState(savedProfile);
  const [newTag, setNewTag] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // 태그 추가
  const addTag = () => {
    if (newTag && !editableProfile.specializations.includes(newTag.trim())) {
      setEditableProfile({
        ...editableProfile,
        specializations: [...editableProfile.specializations, newTag.trim()],
      });
      setNewTag('');
    }
  };

  // 태그 삭제
  const removeTag = (removedTag: string) => {
    setEditableProfile({
      ...editableProfile,
      specializations: editableProfile.specializations.filter((tag) => tag !== removedTag),
    });
  };

  // 사진 업로드
  const handlePhotoUpload: UploadProps['customRequest'] = (options) => {
    const { file, onSuccess, onError } = options;

    const reader = new FileReader();
    reader.onload = () => {
      setEditableProfile({
        ...editableProfile,
        filePath: reader.result as string,
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
                isEditing ? editableProfile.filePath : savedProfile.filePath
              })`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isEditing && !editableProfile.filePath && (
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
                setEditableProfile({ ...editableProfile, filePath: '' })
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
                ? editableProfile.specializations
                : savedProfile.specializations
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
                value={editableProfile.content}
                onChange={(e) =>
                  setEditableProfile({
                    ...editableProfile,
                    content: e.target.value,
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
                {savedProfile.content}
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
