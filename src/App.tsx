import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import './App.css';
import { Button, ConfigProvider, App as AntdApp, message } from 'antd';
import TitleBar from './TitleBar';
import { CarouselRef } from 'antd/es/carousel';
import UploadButton from './UploadButton';
import { images, theme } from './config';
import ImageCarousel from './ImageCarousel';

const labels = ['adidas', 'converse', 'nike'];

function App() {
  const imgEl = useRef<HTMLImageElement>(null);
  const [model, setModel] = useState<tf.LayersModel>();

  const carouselEl = useRef<CarouselRef>(null);
  const [carouselCurr, setCarouselCurr] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [customImgURL, setCustomImgURL] = useState<string>();

  async function makePrediction() {
    if (model && imgEl.current) {
      imgEl.current.src =
        carouselCurr === 3 && customImgURL
          ? customImgURL
          : images[carouselCurr].url;
      const tensor = tf.browser.fromPixels(imgEl.current);
      const resized = tf.image.resizeBilinear(tensor, [240, 240]).mul(1 / 255);
      const expandedTensor = resized.expandDims();
      const predictions = (
        model.predict(expandedTensor) as tf.Tensor<tf.Rank>
      ).as1D();

      const result: { [name: string]: number } = {};
      for (const [i, v] of predictions.arraySync().entries()) {
        result[labels[i]] = v;
      }
      console.log(result);
      alert(labels[predictions.argMax(0).arraySync() as number]);
    }
  }

  useEffect(() => {
    tf.loadLayersModel('/tfjs/model.json').then(setModel);
  }, []);

  return (
    <ConfigProvider theme={theme}>
      <AntdApp>
        <div className="message">{contextHolder}</div>
        <div className="base">
          <TitleBar />
          <div>
            <ImageCarousel
              imgRef={imgEl}
              carouselRef={carouselEl}
              onCarouselAfterChange={setCarouselCurr}
              customImgURL={customImgURL}
            />
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
          </div>
        </div>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
