import React from 'react';
import { Upload, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';

interface ImageUploadProps {
  fileList: UploadFile[];
  onPreview: (file: UploadFile) => Promise<void>;
  onChange: UploadProps['onChange'];
  previewImage: string;
  previewOpen: boolean;
  onPreviewClose: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  fileList,
  onPreview,
  onChange,
  previewImage,
  previewOpen,
  onPreviewClose,
}) => {
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="mt-2">Upload</div>
    </div>
  );

  return (
    <div className="relative">
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={onPreview}
        onChange={onChange}
      >
        {fileList.length >= 5 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => !visible && onPreviewClose(),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default ImageUpload; 