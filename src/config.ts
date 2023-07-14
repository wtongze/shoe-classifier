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

export const labels = ['adidas', 'converse', 'nike'];
