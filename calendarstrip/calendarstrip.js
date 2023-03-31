import { useEffect, useState } from 'react';
import { Card } from '../UI';
import { getTime, getDate, getDayOfWeek } from '../../../util/time';
import './calendarstrip.css';

export const Upcoming = (props) => {
  return(
    <div
      id={props.id}
      className={`dateBody ${props.className || ''}`.trim()}
    >
      <ul>
        {props.assignments.slice(0, 3).map((y, i) =>
          <li
            key={i}
          >
            <div>
              <span><a href='/'>{y.assignmentName}</a></span>
              <span>
                {props.date
                  ? `${getDate(y.deadline)}`
                  : `${getTime(y.deadline)}`
                }
              </span>
            </div>
          </li>
        )}
      </ul>
      {props.assignments.length === 0
        ? <br></br>
        : <span
            className='mobile'
          >
            {`${props.assignments.length} Due`}
          </span>
      }
      {props.assignments.length > 3 &&
        <a
          href='/'
          className='more'
        >
          + {props.assignments.length - 3} more
        </a>
      }
    </div>
  )
}

export const Calendar = (props) => {
  const [data, setData] = useState([]);
  const dates = [0, 1, 2, 3, 4].map(i => {
    const day = new Date();
    day.setHours(0, 0, 0, 0);
    day.setDate(day.getDate() + i);
    return(day.getTime());
  });

  useEffect(() => {
    let tmp = [];
    dates.forEach((date) => {
      tmp.push({
        deadline: date,
        assignments: props.assignments.filter(x => {
          const assignmentDate = new Date(x.deadline);
          assignmentDate.setHours(0, 0, 0, 0);
          return(assignmentDate.getTime() === date);
        })
      })
    });
    setData(tmp);
  }, [props.assignments, dates])

  return(
    <Card
      id={props.id}
      width='full'
      className={`calendar ${props.className || ''}`.trim()}
    >
      <div className='headerBg'></div>
      {data.map((x) => {
        const thisDay = new Date(x.deadline);
        return(
          <div
            className='date'
          >
            <h3
              className='dateHeading'
            >
              {`${getDayOfWeek(thisDay)} `}
              <span
                className='dayMonth'
              >
                {`${getDate(thisDay)}`}
              </span>
            </h3>
            <Upcoming assignments={x.assignments} />
          </div>
        )
      })}
    </Card>
  )
}