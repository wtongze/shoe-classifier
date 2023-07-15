import { useRef, useState } from 'react';
import './App.css';
import {
  Button,
  ConfigProvider,
  App as AntdApp,
  message,
  Row,
  Col,
  Alert,
  Typography,
} from 'antd';
import TitleBar from './TitleBar';
import { CarouselRef } from 'antd/es/carousel';
import UploadButton from './UploadButton';
import { alertContent, images, theme } from './config';
import ImageCarousel from './ImageCarousel';
import useTFjsPredict, { Result } from './useTFjsPredict';
import PredictionCharts from './PredictionCharts';
import { BulbOutlined } from '@ant-design/icons';

function App() {
  const imgEl = useRef<HTMLImageElement>(null);
  const carouselEl = useRef<CarouselRef>(null);
  const [carouselCurr, setCarouselCurr] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [customImgURL, setCustomImgURL] = useState<string>();
  const [result, setResult] = useState<Result>();

  const predict = useTFjsPredict();

  async function makePrediction() {
    if (imgEl.current) {
      imgEl.current.src =
        carouselCurr === 3 && customImgURL
          ? customImgURL
          : images[carouselCurr].url;
      try {
        const result = await predict(imgEl.current);
        setResult(result);
      } catch (e: any) {
        messageApi.error(e.toString());
      }
    }
  }

  return (
    <ConfigProvider theme={theme}>
      <AntdApp>
        <div className="message">{contextHolder}</div>
        <div className="base">
          <TitleBar />
          <Row>
            <Col span={12} className="col-item">
              <ImageCarousel
                imgRef={imgEl}
                carouselRef={carouselEl}
                onCarouselAfterChange={setCarouselCurr}
                customImgURL={customImgURL}
              />
              <Alert
                style={{ marginTop: 16 }}
                message={alertContent}
                type="info"
                className="alert"
                showIcon
                closeIcon
              />
            </Col>
            <Col span={24} style={{ padding: '0 16px' }} className="col-item">
              <div className="button-row">
                <Row>
                  <Col span={12} style={{ paddingRight: 8 }}>
                    <UploadButton
                      messageApi={messageApi}
                      onUploadEnd={(url) => {
                        setCustomImgURL(url);
                        setTimeout(() => {
                          if (carouselEl.current) {
                            carouselEl.current.goTo(3);
                          }
                        }, 300);
                      }}
                    />
                  </Col>
                  <Col span={12} style={{ paddingLeft: 8 }}>
                    <Button
                      type="primary"
                      onClick={makePrediction}
                      block
                      icon={<BulbOutlined />}
                      size="large"
                    >
                      Predict
                    </Button>
                  </Col>
                </Row>
              </div>
              <PredictionCharts result={result} />
            </Col>
          </Row>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '32px 0',
            }}
          >
            <Typography.Text style={{ color: 'gray' }}>
              Made with{' '}
              <a
                href="https://www.tensorflow.org/js"
                target="_blank"
                rel="noreferrer"
              >
                TensorFlow.js
              </a>{' '}
              and{' '}
              <a href="https://ant.design" target="_blank" rel="noreferrer">
                AntD
              </a>
              .
            </Typography.Text>
          </div>
        </div>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
