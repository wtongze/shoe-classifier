import { ThemeConfig } from 'antd';

export const images = [
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

export const theme: ThemeConfig = {
  token: {
    fontFamily: 'Ubuntu, sans-serif',
    fontSize: 16,
    fontWeightStrong: 700,
  },
};

export const alertContent =
  'You can use this CNN model to classify the make of the shoe. ' +
  'It currently only supports Nike, Adidas & Converse. Feel free' +
  ' to choose an example image or upload your own one and click ' +
  'the "predict" button to see the results.';

export const labels = ['adidas', 'converse', 'nike'];
