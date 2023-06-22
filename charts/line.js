import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Context from '../../../context';
import { useContext } from 'react';

export const LineChart = (props) => {
  const { darkMode } = useContext(Context);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler,
    Tooltip,
    Legend
  );
  ChartJS.defaults.color = darkMode.css['--gray'];

  return(
    <div className='chart'>
      <Line
        options={{
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              min: props.min || 0,
              max: props.max,
              grid: {
                color: darkMode.css['--lightGray']
              },
              title: {
                display: true,
                text: props.titley,
                font: {
                  size: 14
                }
              }
            },
            x: {
              grid: {
                color: darkMode.css['--lightGray']
              },
              title: {
                display: true,
                text: props.titlex,
                font: {
                  size: 14
                }
              }
            }
          },
          maintainAspectRatio: false,
          responsive: true
        }}
        data={{
          labels: props.labels || props.data.map((x, i) => i + 1),
          datasets: [
            {
              label: props.tooltip,
              data: props.data,
              fill: false,
              backgroundColor: '#c1e1cfb1',
              borderColor: "#C1E1CF"
            }
          ]
        }}
      />
    </div>
  )
}