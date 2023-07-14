import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';

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
          props.messageApi.success(
            `${info.file.name} file uploaded successfully.`
          );
        } else if (status === 'error') {
          props.messageApi.error(`${info.file.name} file upload failed.`);
        }
      }}
      onDrop={(e) => {
        console.log('Dropped files', e.dataTransfer.files);
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
    >
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
}

export default UploadButton;
