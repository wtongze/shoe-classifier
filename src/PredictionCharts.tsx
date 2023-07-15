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
import { PredictionResult } from './useTFjsPredict';

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
  aspectRatio: 1.5,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Prediction Result',
      font,
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
      suggestedMax: 1.0
    },
  },
};

interface Props {
  result?: PredictionResult;
}

function PredictionCharts(props: Props) {
  const data = {
    labels: chartLabels,
    datasets: [
      {
        data: Object.values(props.result || {}),
        backgroundColor: '#0575E6',
      },
    ],
  };

  return (
    <div style={{ backgroundColor: '#f1f3f5', padding: 16, marginTop: 16 }}>
      <Bar options={options} data={data} />
    </div>
  );
}

export default PredictionCharts;
