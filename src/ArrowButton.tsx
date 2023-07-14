import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './ArrowButton.css';

interface Props {
  direction: 'left' | 'right';
  onClick?: () => void;
}

function ArrowButton(props: Props) {
  return (
    <Button
      icon={props.direction === 'left' ? <LeftOutlined /> : <RightOutlined />}
      onClick={props.onClick}
      className={props.direction === 'left' ? 'arrow-left' : 'arrow-right'}
    />
  );
}

export default ArrowButton;
