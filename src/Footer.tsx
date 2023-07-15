import { Typography } from 'antd';

function Footer() {
  return (
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
  );
}

export default Footer;
