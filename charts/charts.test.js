import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LineChart } from './line';
import Context from '../../../context';
import * as ChartJS from 'react-chartjs-2';
import { PassFailPie } from './pie';
import { SubmissionsBarChart } from './bar';

const mockTheme = {
  darkMode: {
    css: {
      '--lightGray': 'blue'
    }
  }
};

jest.mock('react-chartjs-2', () => ({
  __esModule: true,
  ...(jest.requireActual("react-chartjs-2")),
}))

describe('Line chart', () => {
  test('Chart is shown', () => {
    render(
      <Context.Provider value={mockTheme}>
        <LineChart
          titlex='testx'
          titley='testy'
          labels={['one', 'two']}
          min={0}
          max={20}
          data={[10, 6]}
        />
      </Context.Provider>
    )

    expect(screen.getByRole('img')).toBeInTheDocument();
  })

  test('Chart props are set', () => {
    const mockChartData = {
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            min: 0,
            max: 20,
            grid: {
              color: mockTheme.darkMode.css['--lightGray']
            },
            title: {
              display: true,
              text: 'testy',
              font: {
                size: 14
              }
            }
          },
          x: {
            grid: {
              color: mockTheme.darkMode.css['--lightGray']
            },
            title: {
              display: true,
              text: 'testx',
              font: {
                size: 14
              }
            }
          }
        },
        maintainAspectRatio: false,
        responsive: true
      },
      data: {
        labels: ['one', 'two'],
        datasets: [
          {
            label: 'testtip',
            data: [10, 6],
            fill: false,
            backgroundColor: '#c1e1cfb1',
            borderColor: "#C1E1CF"
          }
        ]
      }
    }

    const mockChart = jest.fn((data) => JSON.stringify(data))
    ChartJS.Line = mockChart;

    render(
      <Context.Provider value={mockTheme}>
        <LineChart
          titlex='testx'
          titley='testy'
          labels={['one', 'two']}
          data={[10, 6]}
          min={0}
          max={20}
          tooltip='testtip'
        />
      </Context.Provider>
    )

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(mockChart).toHaveReturnedWith(JSON.stringify(mockChartData))
  })
})

describe('Pass/Fail pie chart', () => {
  test('Chart is shown', () => {
    render(
      <Context.Provider value={mockTheme}>
        <PassFailPie
          data={[10, 6]}
        />
      </Context.Provider>
    )

    expect(screen.getByRole('img')).toBeInTheDocument();
  })

  const mockChartData = {
    options: {
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
    },
    data: {
      labels: ['Passing', 'Failing'],
      datasets: [
        {
          label: 'Passing',
          data: [10, 6],
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
    }
  }

  test('Chart props are set', () => {
    const mockChart = jest.fn((data) => JSON.stringify(data))
    ChartJS.Pie = mockChart;

    render(
      <Context.Provider value={mockTheme}>
        <PassFailPie
          data={[10, 6]}
        />
      </Context.Provider>
    )

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(mockChart).toHaveReturnedWith(JSON.stringify(mockChartData))
  })

  test('Chart props (past tense) are set', () => {
    const mockChart = jest.fn((data) => JSON.stringify(data))
    ChartJS.Pie = mockChart;

    render(
      <Context.Provider value={mockTheme}>
        <PassFailPie
          mode='past'
          data={[10, 6]}
        />
      </Context.Provider>
    )

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(mockChart).toHaveReturnedWith(JSON.stringify({
      ...mockChartData,
      data: {
        ...mockChartData.data,
        labels: ['Passed', 'Failed'],
        datasets: [
          {
            ...mockChartData.data.datasets[0],
            label: 'Passed'
          }
        ]
      }
    }))
  })
})

describe('Submissions bar chart', () => {
  test('Chart is shown', () => {
    render(
      <Context.Provider value={mockTheme}>
        <SubmissionsBarChart
          data={[10, 6]}
          filter={[false, [{submissionPoints: 10}, {submissionPoints: 6}]]}
          points={20}
        />
      </Context.Provider>
    )

    expect(screen.getByRole('img')).toBeInTheDocument();
  })

  const mockChartData = {
    options: {
      onClick: () => {},
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: () => {},
            title: () => {}
          }
        }
      },
      scales: {
        y: {
          min: 0,
          max: 20,
          title: {
            display: true,
            text: `Points / 20`,
            font: {
              size: 14
            }
          }
        },
        x: {
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
    },
    data: {
      labels: [1, 2],
      datasets: [
        {
          label: 'Submission',
          data: [10, 6],
          backgroundColor: ['#C1E1CF']
        }
      ]
    }
  }

  test('Chart props are set', () => {
    const mockChart = jest.fn((data) => JSON.stringify(data))
    ChartJS.Bar = mockChart;

    render(
      <Context.Provider value={mockTheme}>
        <SubmissionsBarChart
          data={[10, 6]}
          filter={[false, [{submissionPoints: 10}, {submissionPoints: 6}]]}
          points={20}
        />
      </Context.Provider>
    )

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(mockChart).toHaveReturnedWith(JSON.stringify(mockChartData))
  })

  test('Chart props with selected are set', () => {
    const mockChart = jest.fn((data) => JSON.stringify(data))
    ChartJS.Bar = mockChart;

    render(
      <Context.Provider value={mockTheme}>
        <SubmissionsBarChart
          data={[10, 6]}
          filter={[false, [{submissionPoints: 10}, {submissionPoints: 6}]]}
          points={20}
          selected={0}
        />
      </Context.Provider>
    )

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(mockChart).toHaveReturnedWith(JSON.stringify({
      ...mockChartData,
      data: {
        labels: [1, 2],
        datasets: [
          {
            label: 'Submission',
            data: [10, 6],
            backgroundColor: ['#357150', '#C1E1CF']
          }
        ]
      }
    }))
  })

  test('Chart props with filter are set', () => {
    const mockChart = jest.fn((data) => JSON.stringify(data))
    ChartJS.Bar = mockChart;

    render(
      <Context.Provider value={mockTheme}>
        <SubmissionsBarChart
          data={[10, 6]}
          filter={[true, [{submissionPoints: 10}, {submissionPoints: 6, display: true}]]}
          points={20}
          selected={0}
        />
      </Context.Provider>
    )

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(mockChart).toHaveReturnedWith(JSON.stringify({
      ...mockChartData,
      data: {
        labels: [1, 2],
        datasets: [
          {
            label: 'Submission',
            data: [10, 6],
            backgroundColor: ['#C1E1CF', '#357150']
          }
        ]
      }
    }))
  })

  test('Chart props with testCase are set', () => {
    const mockChart = jest.fn((data) => JSON.stringify(data))
    ChartJS.Bar = mockChart;

    render(
      <Context.Provider value={mockTheme}>
        <SubmissionsBarChart
          data={[10, 6]}
          filter={[false, [
            {
              submissionPoints: 10,
              testCases: [{score: 5}]
            },
            {
              submissionPoints: 6,
              testCases: [{score: 1}]
            }
          ]]}
          points={20}
          testCase={0}
        />
      </Context.Provider>
    )

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(mockChart).toHaveReturnedWith(JSON.stringify({
      ...mockChartData,
      data: {
        labels: [1, 2],
        datasets: [
          {
            label: 'Submission',
            data: [5, 1],
            backgroundColor: ['#C1E1CF']
          }
        ]
      }
    }))
  })
})

jest.clearAllMocks();