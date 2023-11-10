import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Context from '../../../context';
import { useContext } from 'react';

export const PassFailPie = (props) => {
  const { darkMode } = useContext(Context);
  ChartJS.register(ArcElement, Tooltip, Legend);
  ChartJS.defaults.color = darkMode?.css['--gray'];

  return(
    <div className='chart'>
      {props.data &&
        <Pie
          options={{
            plugins: {
              legend: {
                position: 'left'
              },
              tooltip: {
                callbacks: {
                  label: (event) =>
                    (`${event.raw} ${event.raw === 1 ? 'Student' : 'Students'}: ${(event.raw / (event.dataset.data[0] + event.dataset.data[1]) * 100).toFixed(2)}%`)
                }
              }
            },
            maintainAspectRatio: false,
            responsive: true
          }}
          data={{
              labels: props.mode === 'past' ?  ['Passed', 'Failed'] : ['Passing', 'Failing'],
              datasets: [
                {
                  label: props.mode === 'past' ? 'Passed' : 'Passing',
                  data: props.data,
                  backgroundColor: [
                    '#C1E1CF',
                    '#ffc5c5'
                  ],
                  borderColor: [
                    '#357150',
                    '#FF6262'
                  ],
                  borderWidth: 1,
                },
              ]
          }}
        />
      }
    </div>
  )
}