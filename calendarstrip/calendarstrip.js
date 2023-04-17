import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../UI';
import { getTime, getDate, getDayOfWeek, isPastDue, sortOldest } from '../../../util/time';
import './calendarstrip.css';

export const Upcoming = (props) => {
  return(
    <div
      id={props.id}
      className={`dateBody ${props.className || ''}`.trim()}
    >
      <ul>
        {props.assignments.sort(sortOldest).slice(0, 3).map((y, i) =>
          <li
            key={i}
          >
            <div>
              <span>
                <Link to={`/courses/${props.courseId}/assignments/${y.assignmentId}`}>
                  {y.assignmentName}
                </Link>
              </span>
              <span
                //Check if Past due and no submissions (submission check might have to be changed)
                className={((!y.Submission || Object.keys(y.Submission).length === 0) && isPastDue(y.deadline)) ? 'pastDue' : null}
              >
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
        : <Link
            to={`/courses/${props.courseId}/assignments/`}
            className='mobile'
          >
            {`${props.assignments.length} Due`}
          </Link>
      }
      {props.assignments.length > 3 &&
        <Link
          to={`/courses/${props.courseId}/assignments`}
          className='more'
        >
          + {props.assignments.length - 3} more
        </Link>
      }
    </div>
  )
}

export const Calendar = (props) => {
  const [data, setData] = useState([]);
  const [dates] = useState([0, 1, 2, 3, 4].map(i => {
    const day = new Date();
    day.setHours(0, 0, 0, 0);
    day.setDate(day.getDate() + i);
    return(day.getTime());
  }));

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
      {data.map((x, i) => {
        const thisDay = new Date(x.deadline);
        return(
          <div
            key={i}
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