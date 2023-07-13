import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

const labels = ['adidas', 'converse', 'nike'];

function App() {
  const imgEl = useRef<HTMLImageElement>(null);
  const [model, setModel] = useState<tf.LayersModel>();

  async function makePrediction() {
    if (model) {
      const tensor = tf.browser.fromPixels(imgEl.current!);
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
    <div className="App">
      <img src="3.jpg" ref={imgEl} alt="img" width={300} />
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            // @ts-ignore
            imgEl.current.src = URL.createObjectURL(e.target.files[0]);
          }}
        ></input>
        <button onClick={makePrediction}>Predict</button>
      </div>
    </div>
  );
}

export default App;
