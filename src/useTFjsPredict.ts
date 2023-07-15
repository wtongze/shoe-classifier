import * as tf from '@tensorflow/tfjs';
import { useState, useEffect } from 'react';
import { labels } from './config';

interface PredictionResult {
  [name: string]: number;
}

export interface Result {
  result: PredictionResult;
  prediction: string;
}

function sleep(num: number) {
  return new Promise((res) => setTimeout(res, num));
}

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

  return async function (imgEl: HTMLImageElement): Promise<Result> {
    if (model) {
      while (imgEl.height === 0 || imgEl.width === 0) {
        await sleep(100);
      }
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
        result: result,
        prediction: labels[predictions.argMax(0).arraySync() as number],
      };
    } else {
      throw Error('Model not ready yet.');
    }
  };
}

export default useTFjsPredict;
