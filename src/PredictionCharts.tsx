import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { labels } from './config';
import { Result } from './useTFjsPredict';
import './PredictionCharts.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const font = {
  family: 'Ubuntu, sans-serif',
  size: 20,
  weight: '600',
};

const chartLabels = labels.map(
  (i) => i.substring(0, 1).toUpperCase() + i.substring(1)
);

export const options = {
  responsive: true,
  aspectRatio: 1.75,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Probability',
      font: {
        ...font,
        size: 16,
      },
    },
    tooltip: {
      titleFont: font,
      bodyFont: {
        ...font,
        size: 16,
        weight: '500',
      },
    },
  },
  scales: {
    x: {
      ticks: {
        font,
      },
    },
    y: {
      ticks: {
        font,
      },
      suggestedMax: 1.0,
    },
  },
};

interface Props {
  result?: Result;
}

function PredictionCharts(props: Props) {
  const data = {
    labels: chartLabels,
    datasets: [
      {
        data: Object.values(props.result?.result || {}),
        backgroundColor: '#0575E6',
      },
    ],
  };
  const target = props.result?.prediction;

  return (
    <div
      style={{
        padding: 16,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      className='prediction-charts'
    >
      <div style={{ width: '100%' }}>
        <h3 className='result-title'>Result</h3>
        <div className="logos">
          <img
            src="/logo/adidas.svg"
            alt="Adidas Logo"
            className={target === 'adidas' ? 'logo selected' : 'logo'}
          />
          <img
            src="/logo/converse.svg"
            alt="Converse Logo"
            className={target === 'converse' ? 'logo selected' : 'logo'}
          />
          <img
            src="/logo/nike.svg"
            alt="Nike Logo"
            className={target === 'nike' ? 'logo selected' : 'logo'}
          />
        </div>
      </div>
      <div style={{ flex: 1, width: '100%', height: 300 }}>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}

export default PredictionCharts;
