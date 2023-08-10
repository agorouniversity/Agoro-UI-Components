import { useState, useEffect, useContext } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Context from '../../../context';

export const SubmissionsBarChart = (props) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const [options, setOptions] = useState(undefined);
  const [data, setData] = useState(undefined);
  const { darkMode } = useContext(Context);
  ChartJS.defaults.color = darkMode?.css['--gray'];

  useEffect(() => {
    setOptions({
      onClick: (event, element) => {
        if(element.length > 0) {
          props.click(element[0].element.$context.dataIndex);
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (event) =>
              (`${(event.raw / props.points * 100).toFixed(2)}%`),
            title: (event) => (`Submission ${event[0].dataIndex + 1}`)
          }
        }
      },
      scales: {
        y: {
          min: 0,
          max: props.points,
          grid: {
            color: darkMode?.css['--lightGray']
          },
          title: {
            display: true,
            text: `Points / ${props.points}`,
            font: {
              size: 14
            }
          }
        },
        x: {
          grid: {
            color: darkMode?.css['--lightGray']
          },
          title: {
            display: true,
            text: 'Submission Number',
            font: {
              size: 14
            }
          }
        }
      },
      maintainAspectRatio: false,
      responsive: true
    });
  }, [props, darkMode])

  useEffect(() => {
    let color
    if(props.filter) {
      color = props.data
    } else if(props.selected !== undefined) {
      color = props.data.map((x, i) => i === props.selected ? {display: true} : null)
    } else {
      color = [{display: false}];
    }
    setData({
      labels: props.data.map((x, i) => i + 1),
      datasets: [
        {
          label: 'Submission',
          data: props.data.map((submission) => {
            if(props.testCase === undefined) {
              return(submission.submissionPoints);
            } else {
              return(submission.testcases[props.testCase].score);
            }
          }),
          backgroundColor: color.map(x => x?.display ? '#357150' : '#C1E1CF')
        }
      ]
    })
  }, [props.data, props.testCase, props.filter, props.selected])

  return(
    <>
      {(options && data) &&
        <div className='chart'>
          <Bar
            options={options}
            data={data}
          />
        </div>
      }
    </>
  )
}