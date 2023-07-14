import * as tf from '@tensorflow/tfjs';
import { useState, useEffect } from 'react';
import { labels } from './config';

function useTFjsPredict() {
  const [model, setModel] = useState<tf.LayersModel>();

  useEffect(() => {
    tf.loadLayersModel('/tfjs/model.json').then(setModel);
  }, []);

  useEffect(() => {
    return function cleanup() {
      if (model) {
        try {
          console.log('dispose model');
          model.dispose();
        } catch (e) {}
      }
    };
  }, [model]);

  return async function (imgEl: HTMLImageElement) {
    if (model) {
      const tensor = tf.browser.fromPixels(imgEl);
      const resized = tf.image.resizeBilinear(tensor, [240, 240]).mul(1 / 255);
      const expandedTensor = resized.expandDims();
      const predictions = (
        model.predict(expandedTensor) as tf.Tensor<tf.Rank>
      ).as1D();
      const result: { [name: string]: number } = {};
      const arr = await predictions.array();
      for (const [i, v] of arr.entries()) {
        result[labels[i]] = v;
      }
      return {
        probability: result,
        prediction: labels[predictions.argMax(0).arraySync() as number],
      };
    } else {
      throw Error('Model not ready yet.');
    }
  };
}

export default useTFjsPredict;
