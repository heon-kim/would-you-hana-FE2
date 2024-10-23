import React, { useState, useEffect } from 'react';
import '../../App.css';
import { Select, message, Image, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';

const getBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const QuestionRegister: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [category, setCategory] = useState(''); // 분야 추가
  const maxTitleLength = 30;
  const maxContentLength = 5000;
  const [isChecked, setIsChecked] = useState(false); // 체크 상태 관리

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked); // 체크 상태 업데이트
  };


  // 로컬스토리지에서 파일 리스트 불러오기
  useEffect(() => {
    const storedFiles = localStorage.getItem('uploadedImages');
    if (storedFiles) {
      setFileList(JSON.parse(storedFiles));
    }
  }, []);

  const saveToLocalStorage = (files: UploadFile[]) => {
    localStorage.setItem('uploadedImages', JSON.stringify(files));
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = async ({
    fileList: newFileList,
  }) => {
    if (newFileList.length > 5) {
      message.error('최대 5개의 이미지만 업로드할 수 있습니다.');
      return;
    }

    const updatedFileList = await Promise.all(
      newFileList.map(async (file) => {
        if (!file.url && !file.preview && file.originFileObj) {
          file.preview = await getBase64(file.originFileObj as File);
        }
        return file;
      })
    );

    setFileList(updatedFileList);
    saveToLocalStorage(updatedFileList); // 로컬스토리지에 저장
  };

  const handleRegister = () => {
    if (!category || !title || !content) {
      message.error('모든 필드를 입력해주세요.');
      return;
    }

    else if (!isChecked) {
      message.error('이용약관에 동의해야 질문을 등록할 수 있습니다.'); // 체크박스 체크 여부 확인
      return;
    }

    // 저장할 데이터 객체 생성
    const questionData = {
      category,
      title,
      content,
      images: fileList.map((file) => ({
        name: file.name,
        preview: file.preview || '',
      })),
    };

    // 로컬스토리지에 저장
    localStorage.setItem('questionData', JSON.stringify(questionData));
    message.success('질문이 등록되었습니다!');
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
        width: '60%',
        alignSelf: 'center',
      }}
    >
      <h1
        style={{
          color: 'black',
          fontSize: '30px',
          lineHeight: '1.2',
          textAlign: 'left',
          marginTop: '20px',
          marginBottom: '40px',
          fontWeight: 'bold',
        }}
      >
        <p>
          질문을 남겨주시면,
          <br />
          <span style={{ color: '#008485' }}> 내 주변의 하나 가족</span>
          들이
          <br /> 빠른 시일 내에 답해드려요!
        </p>
      </h1>

      <Select
        showSearch
        style={{ width: '100%', height: '60px' }}
        placeholder='어떤 분야가 궁금한가요?'
        optionFilterProp='label'
        onChange={(value) => setCategory(value)} // 분야 상태 설정
        options={[
          { value: '1', label: '예금/적금' },
          { value: '2', label: '이체' },
          { value: '3', label: '자산관리' },
          { value: '4', label: '퇴직연금' },
          { value: '5', label: '펀드' },
          { value: '6', label: '신탁' },
          { value: '7', label: 'ISA' },
          { value: '8', label: '전자금융' },
          { value: '9', label: '대출' },
          { value: '10', label: '외환' },
          { value: '11', label: '보험' },
          { value: '12', label: '카드' },
          { value: '13', label: '기타' },
        ]}
      />

      <div
        className='mx-100 mx-auto'
        style={{ width: '100%', marginTop: '40px' }}
      >
        <div className='mb-6'>
          <label className='block mb-2 font-bold'>제목</label>
          <div className='relative'>
            <input
              type='text'
              placeholder='궁금한 점을 요약해서 작성해 주세요.'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={maxTitleLength}
              className='w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-gray-500'
              style={{ fontWeight: '300' }}
            />
            <span className='absolute bottom-2 right-3 text-gray-500 text-sm'>{`${title.length}/${maxTitleLength}`}</span>
          </div>
        </div>

        <div className='mb-4'>
          <label className='block mb-2 font-bold'>내용</label>
          <div className='relative'>
            <textarea
              placeholder={`· 자세하게 적으면 좋은 답변을 받을 수 있어요.\n· 개인정보(본명, 전화 번호 등)를 쓰면 안 돼요.\n· 질문에서 내 이름은 보이지 않아요.`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={maxContentLength}
              className='w-full border border-gray-300 rounded-md p-3 h-52 resize-none focus:outline-none focus:border-gray-500'
              style={{ fontWeight: '300' }}
            />
            <span className='absolute bottom-2 right-3 text-gray-500 text-sm'>{`${content.length}/${maxContentLength}`}</span>
          </div>
        </div>

        <div className='mb-6'>
          <div className='relative'>
            <Upload
              //서버로 이미지 업로드 
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType='picture-card'
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 5 ? null : uploadButton}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{ display: 'none' }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(''),
                }}
                src={previewImage}
              />
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <input type='checkbox' id='agree' style={{ marginRight: '10px' }} checked={isChecked} onChange={handleCheckboxChange} />
        <label
          htmlFor='agree'
          style={{ fontFamily: 'Hana2Regular', fontSize: '14px' }}
        >
          개인정보 처리 방침에 동의합니다.
        </label>
      </div>

      <button
        onClick={handleRegister}
        style={{
          width: '100%',
          height: '50px',
          textAlign: 'center',
          color: 'white',
          backgroundColor: '#008485',
          marginTop: '40px',
          marginBottom: '40px',
          fontWeight: '300',
        }}
      >
        질문 등록
      </button>
    </div>
  );
};

export default QuestionRegister;