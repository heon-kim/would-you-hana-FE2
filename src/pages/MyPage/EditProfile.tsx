import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { findUser, updateUser, findBanker, updateBanker } from '../../utils/userStorage';
import { useSelector } from 'react-redux';
import { RootState } from '../../hoc/store';
import { User, Banker } from '../../types/user';

const { Option } = Select;

const EditProfile: React.FC = () => {
  const [user, setUser] = useState({
    email: '',
    nickname: '',
    name: '',
    phone: '',
    birthDate: '',
    location: '',
    gender: '',
  });

  const [banker, setBanker] = useState({
    email: '',
    name: '',
    branchName: '',
  })

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const userEmail = useSelector((state: RootState) => state.auth.userEmail);

  useEffect(() => {
    if (isAuthenticated && userEmail) {
      if(userRole === 'C') {
        const userData = findUser(userEmail);
        if(userData) {
          setUser(userData);
        }
      }
      else if(userRole === 'B') {
        const bankerData = findBanker(userEmail);
        if(bankerData) {
          setBanker(bankerData);
        }
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(value == null) {
      return;
    }
    else {
      if(isAuthenticated && userRole === 'C') {
        setUser({ ...user, [name]: value });
      }
      else if(isAuthenticated && userRole === 'B') {
        setBanker({...banker, [name]: value});
      }
    }    
  };

  const handleGenderChange = (value: string) => {
    setUser({ ...user, gender: value });
  };

  const handleSave = () => {
    if (isAuthenticated && userRole === 'C') {
      updateUser(user as User);
      message.success('개인정보가 성공적으로 수정되었습니다!');
    } 
    else if (isAuthenticated && userRole === 'B') {
      updateBanker(banker as Banker);
      message.success('개인정보가 성공적으로 수정되었습니다!');
    }
    else {
      message.error('필수 정보를 입력하세요.');
    }
  };

  return (
    <>
      <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '5%' }}>개인정보 수정</div>
      <Form
        layout="horizontal"
        labelCol={{ span: 8 }} // 라벨의 너비를 8로 설정하여 고정된 너비 유지
        wrapperCol={{ span: 16 }} // 입력 필드의 너비를 16으로 설정하여 일렬로 맞춤
        labelAlign="left" // 라벨을 왼쪽 정렬
        colon={false} // 라벨 콜론(:) 제거
      >
        <Form.Item label="이름" style={{ marginBottom: '20px' }}> {/* 필드 간 간격 설정 */}
          <Input value={user.name || banker.name} name="name" disabled style={{ backgroundColor: '#f5f5f5', height: '40px' }} /> {/* 높이 조정 */}
        </Form.Item>
        <Form.Item label="이메일" style={{ marginBottom: '20px' }}> {/* 필드 간 간격 설정 */}
          <Input value={user.email || banker.email} name="email" disabled style={{ backgroundColor: '#f5f5f5', height: '40px' }} /> {/* 높이 조정 */}
        </Form.Item>
        <Form.Item label="비밀번호" required style={{ marginBottom: '20px' }}> {/* 필드 간 간격 설정 */}
          <Input.Password name="password" onChange={handleInputChange} placeholder="8자 이상 비밀번호 입력" style={{ height: '40px' }} /> {/* 높이 조정 */}
        </Form.Item>
        <Form.Item label="비밀번호 확인" required style={{ marginBottom: '20px' }}> {/* 필드 간 간격 설정 */}
          <Input.Password name="passwordConfirm" onChange={handleInputChange} placeholder="비밀번호 확인" style={{ height: '40px' }} /> {/* 높이 조정 */}
        </Form.Item>
        {(isAuthenticated && userRole==='C') && (
          <>
            <Form.Item label="닉네임" required 
              style={{ marginBottom: '20px' }}> {/* 필드 간 간격 설정 */}
              <div style={{ display: 'flex', gap: '10px' }}> {/* flexbox를 사용하여 버튼을 오른쪽에 배치 */}
                <Input value={user.nickname} name="nickname" onChange={handleInputChange} style={{ height: '40px' }} /> {/* 높이 조정 */}
                <Button type="primary" style={{height: '40px'}}>중복 확인</Button>
              </div>
            </Form.Item>
            <Form.Item label="생년월일" style={{ marginBottom: '20px' }}> {/* 필드 간 간격 설정 */}
              <Input value={user.birthDate} name="birthDate" placeholder="연도-월-일" onChange={handleInputChange} style={{ height: '40px' }} /> {/* 높이 조정 */}
            </Form.Item>
            <Form.Item label="성별" style={{ marginBottom: '20px' }}> {/* 필드 간 간격 설정 */}
              <Select value={user.gender} onChange={handleGenderChange} style={{ height: '40px' }}>
                <Option value="남성">남성</Option>
                <Option value="여성">여성</Option>
                <Option value="선택 안 함">선택 안 함</Option>
              </Select>
            </Form.Item>
            <Form.Item label="시/구" style={{ marginBottom: '20px' }}> {/* 필드 간 간격 설정 */}
              <Input value={user.location} name="location" onChange={handleInputChange} style={{ height: '40px' }} /> {/* 높이 조정 */}
            </Form.Item>
            <Form.Item label="전화번호" required style={{ marginBottom: '20px' }}> {/* 필드 간 간격 설정 */}
              <Input value={user.phone} name="phone" placeholder="예시) 010-1234-5678" onChange={handleInputChange} style={{ height: '40px' }} /> {/* 높이 조정 */}
            </Form.Item>
          </>
        )}
        {(isAuthenticated && userRole==='B') && (
          <Form.Item label="지점명" required style={{ marginBottom: '20px' }}> {/* 필드 간 간격 설정 */}
            <Input value={banker.branchName} name="branchName" onChange={handleInputChange} style={{ height: '40px' }} /> {/* 높이 조정 */}
          </Form.Item>
        )}
        
        <Button type="primary" onClick={handleSave} style={{ width: '100%', marginTop: '20px', height: '50px' }}> {/* 저장 버튼 높이 설정 */}
          저장
        </Button>
      </Form>
    </>
  );
};

export default EditProfile;