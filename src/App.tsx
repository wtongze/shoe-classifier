import { useRef, useState } from 'react';
import './App.css';
import {
  ConfigProvider,
  App as AntdApp,
  message,
  Row,
  Col,
  Alert,
} from 'antd';
import TitleBar from './TitleBar';
import { CarouselRef } from 'antd/es/carousel';
import { alertContent, images, theme } from './config';
import ImageCarousel from './ImageCarousel';
import useTFjsPredict, { Result } from './useTFjsPredict';
import PredictionCharts from './PredictionCharts';
import Footer from './Footer';
import ActionButtons from './ActionButtons';

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
            <Col span={24} className="col-item col-padding">
              <ActionButtons
                messageApi={messageApi}
                carouselEl={carouselEl}
                setCustomImgURL={setCustomImgURL}
                makePrediction={makePrediction}
              />
              <PredictionCharts result={result} />
            </Col>
          </Row>
          <Footer />
        </div>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
