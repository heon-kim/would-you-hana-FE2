import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import necessary routing components
import '../../App.css';
import { Select, message, Image, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { findUser } from '../../utils/userStorage';
import { postCount, savePost } from '../../utils/postStorage';
import { getUserEmail } from '../../hoc/request';
import { CommunityCategories } from '../../constants/posts';
import { saveCommunityPost } from '../../utils/communityPostStorage';

const getBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const CommunityRegister: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [category, setCategory] = useState(''); // 분야 추가
  const maxTitleLength = 30;
  const maxContentLength = 5000;
  const navigate = useNavigate();

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

  // 기존 CommunityRegister 컴포넌트 내용 중 handleRegister 함수 부분 수정
const handleRegister = () => {
    if (!category || !title || !content) {
      message.error('모든 필드를 입력해주세요.');
      return;
    }
  
    const userEmail = getUserEmail();
    const user = findUser(userEmail || '');
    const nickname = user?.nickname;
  
    const postData = {
      id: postCount(),
      category,
      title,
      content,
      author: nickname || '',
      createdAt: new Date().toISOString(),
      answered: false,
      counts: {
        views: 0,
        likes: 0,
        comments: 0,
        scraps: 0,
      },
      images: fileList.map((file) => ({
        name: file.name,
        preview: file.preview || '',
      })),
    };
  
    saveCommunityPost(postData); // 로컬 스토리지에 게시글 저장
    message.success('게시글이 등록되었습니다!');
    navigate('/community');
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
        width: '100%',
        paddingLeft: '25%',
        paddingRight: '25%',
        alignSelf: 'center',
      }}
    >
      <h1
        style={{
          color: 'black',
          fontSize: '30px',
          lineHeight: '1.2',
          textAlign: 'left',
          marginTop: '30px',
          marginBottom: '40px',
          fontWeight: 'bold',
        }}
      >
        <p>
          <br />
          <span style={{ color: '#008485' }}> 내 주변의 커뮤니티</span>에
          <br /> 글을 남겨보세요!
        </p>
        
      </h1>
      <Select
        showSearch
        style={{ width: '100%', height: '50px' }}
        placeholder='카테고리 선택'
        optionFilterProp='label'
        onChange={(value) => setCategory(value)} // 분야 상태 설정
        options={CommunityCategories.map((category) => {
          return { value: category, label: category };
        })}
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
              placeholder='제목을 작성해 주세요.'
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
              placeholder={`· 커뮤니티 가이드라인을 준수해주세요.\n· 개인정보(본명, 전화 번호 등)를 쓰면 안 돼요.\n`}
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
              action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
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
          flexDirection: 'column',
          width: '100%',
          height: 'auto',
          alignItems: 'start',
          justifyContent: 'start',
          padding: '25px',
          marginTop: '20px',
          backgroundColor: '#F3F5F7',
          borderRadius: '5px',
        }}
      >
        <p style={{ marginBottom: '10px' }}>이런 경우 글이 삭제될 수 있어요.</p>
        <div style={{color:'#7E8082', fontSize:'15px', fontWeight:'300', display:'flex', flexDirection:'column', gap:'5px'}}>
          <p>
            • 개인정보(이름, 전화번호, 주민등록번호, 읍/면/동 이하 상세 주소
            등)가 있는 경우
          </p>
          <p>• 비방, 욕설이 포함된 글을 작성한 경우</p>
          <p>
          • 유해하거나 예정된 랜딩 페이지로 연결되지 않는 링크를 공유한 경우
          </p>
        </div>
      </div>
      <button
        onClick={handleRegister}
        className='bg-mainColor text-white rounded-md transition-colors duration-200 hover:bg-hoverColor'
        style={{
          width: '100%',
          height: '50px',
          textAlign: 'center',
          color: 'white',
          marginTop: '40px',
          marginBottom: '40px',
          fontWeight: '300',
          borderRadius: '10px',
        }}
      >
        게시물 등록
      </button>
    </div>
  );
};

export default CommunityRegister;
