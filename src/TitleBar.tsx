import { Button, Typography } from 'antd';
import './TitleBar.css'
import { GithubOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

function TitleBar() {
  return (
    <header>
      <Title style={{ margin: 0, fontSize: '1.5rem' }}>Shoe Classifier</Title>
      <Button
        type="link"
        href="https://github.com/wtongze/shoe-classifier"
        target="_blank"
        rel="noreferrer"
        icon={<GithubOutlined />}
      >
        <Text className="title-link">Github</Text>
      </Button>
    </header>
  );
}

export default TitleBar;
