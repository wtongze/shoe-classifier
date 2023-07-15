import { BulbOutlined } from '@ant-design/icons';
import { Row, Col, Button } from 'antd';
import UploadButton from './UploadButton';
import { CarouselRef } from 'antd/es/carousel';
import { MessageInstance } from 'antd/es/message/interface';

interface Props {
  carouselEl: React.RefObject<CarouselRef>;
  messageApi: MessageInstance;
  setCustomImgURL: React.Dispatch<React.SetStateAction<string | undefined>>;
  makePrediction: () => Promise<void>;
}

function ActionButtons(props: Props) {
  return (
    <div className="button-row">
      <Row>
        <Col span={12} style={{ paddingRight: 8 }}>
          <UploadButton
            messageApi={props.messageApi}
            onUploadEnd={(url) => {
              props.setCustomImgURL(url);
              setTimeout(() => {
                if (props.carouselEl.current) {
                  props.carouselEl.current.goTo(3);
                }
              }, 300);
            }}
          />
        </Col>
        <Col span={12} style={{ paddingLeft: 8 }}>
          <Button
            type="primary"
            onClick={props.makePrediction}
            block
            icon={<BulbOutlined />}
            size="large"
          >
            Predict
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default ActionButtons;
