import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import './App.css';
import {
  Button,
  ConfigProvider,
  Typography,
  UploadProps,
  Upload,
  App as AntdApp,
  message,
  Carousel,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TitleBar from './TitleBar';
import ArrowButton from './ArrowButton';
import { CarouselRef } from 'antd/es/carousel';

const { Title, Text } = Typography;

const labels = ['adidas', 'converse', 'nike'];

const images = [
  {
    label: 'nike',
    url: '/nike.jpg',
  },
  {
    label: 'adidas',
    url: '/adidas.jpg',
  },
  {
    label: 'converse',
    url: '/converse.jpg',
  },
];

function App() {
  const imgEl = useRef<HTMLImageElement>(null);
  const [model, setModel] = useState<tf.LayersModel>();

  const carouselEl = useRef<CarouselRef>(null);
  const [carouselCurr, setCarouselCurr] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

  const props: UploadProps = {
    showUploadList: false,
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        messageApi.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        messageApi.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    customRequest({ file, onSuccess, onError }) {
      const reader = new FileReader();
      reader.readAsDataURL(file as Blob);
      reader.onloadend = function () {
        if (imgEl.current) {
          imgEl.current.src = reader.result as string;
          onSuccess!(null);
        }
      };
      reader.onerror = function (e) {
        onError!(e);
      };
    },
  };

  async function makePrediction() {
    if (model && imgEl.current) {
      imgEl.current.src = images[carouselCurr].url;
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
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Ubuntu, sans-serif',
          fontSize: 16,
          fontWeightStrong: 700,
        },
      }}
    >
      <AntdApp>
        <div className="message">{contextHolder}</div>
        <div className="base">
          <TitleBar />
          <div>
            <div style={{ position: 'relative' }}>
              <img ref={imgEl} style={{ display: 'none' }} alt="for TF.js" />
              <Carousel
                ref={carouselEl}
                swipeToSlide
                arrows
                prevArrow={<ArrowButton direction="left" />}
                nextArrow={<ArrowButton direction="right" />}
                afterChange={setCarouselCurr}
              >
                {images.map((i) => (
                  <div key={i.label} className="item">
                    <img src={i.url} alt={i.label} height={500} />
                  </div>
                ))}
              </Carousel>
            </div>

            <div>
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
              <Button
                onClick={() => {
                  carouselEl.current!.goTo(2);
                }}
              >
                Go to 3
              </Button>
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
