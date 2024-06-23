import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
import './UploadButton.css';

interface Props {
  messageApi: MessageInstance;
  onUploadEnd: (url: string) => void;
}

function UploadButton(props: Props) {
  return (
    <Upload
      showUploadList={false}
      onChange={(info) => {
        const { status } = info.file;
        if (status === 'done') {
          props.messageApi.success('Image uploaded successfully.');
        } else if (status === 'error') {
          props.messageApi.error('Failed to upload image.');
        }
      }}
      customRequest={({ file, onSuccess, onError }) => {
        const reader = new FileReader();
        reader.readAsDataURL(file as Blob);
        reader.onloadend = function () {
          if (onSuccess) {
            onSuccess(reader.result);
          }
          props.onUploadEnd(reader.result as string);
        };
        reader.onerror = function (e) {
          onError!(e);
        };
      }}
      className="upload-wrapper"
    >
      <Button icon={<UploadOutlined />} block size="large">
        Upload
      </Button>
    </Upload>
  );
}

export default UploadButton;
