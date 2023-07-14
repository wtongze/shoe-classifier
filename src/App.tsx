import { useRef, useState } from 'react';
import './App.css';
import {
  Button,
  ConfigProvider,
  App as AntdApp,
  message,
  Row,
  Col,
} from 'antd';
import TitleBar from './TitleBar';
import { CarouselRef } from 'antd/es/carousel';
import UploadButton from './UploadButton';
import { images, theme } from './config';
import ImageCarousel from './ImageCarousel';
import useTFjsPredict, { PredictionResult } from './useTFjsPredict';
import PredictionCharts from './PredictionCharts';

function App() {
  const imgEl = useRef<HTMLImageElement>(null);
  const carouselEl = useRef<CarouselRef>(null);
  const [carouselCurr, setCarouselCurr] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [customImgURL, setCustomImgURL] = useState<string>();
  const [result, setResult] = useState<PredictionResult>();

  const predict = useTFjsPredict();

  async function makePrediction() {
    if (imgEl.current) {
      imgEl.current.src =
        carouselCurr === 3 && customImgURL
          ? customImgURL
          : images[carouselCurr].url;
      try {
        const { result, prediction } = await predict(imgEl.current);
        messageApi.info(prediction);
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
            <Col span={24}>
              <ImageCarousel
                imgRef={imgEl}
                carouselRef={carouselEl}
                onCarouselAfterChange={setCarouselCurr}
                customImgURL={customImgURL}
              />
            </Col>
            <Col span={24} style={{ padding: '0 16px' }}>
              <div>
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
                <Button type="primary" onClick={makePrediction}>
                  Predict
                </Button>
              </div>
              <PredictionCharts result={result} />
            </Col>
          </Row>
        </div>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
