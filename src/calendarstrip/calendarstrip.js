import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Table } from '../UI';
import { getTime, getDate, getDayOfWeek, getColor, sortNewest, convertTime } from '../../../util/time';
import './calendarstrip.css';

export const Upcoming = (props) => {
  const Assignment = ({ assignment, time }) => {
    const hour = (new Date(assignment.deadline.T)).getHours();

    return(
      <div title={assignment.assignmentName}>
        <span data-hour={hour}>
          <Link to={`/courses/${props.courseID || assignment.courseID}/assignments/${assignment.assignmentID}`}>
            {assignment.assignmentName}
          </Link>
        </span>
        <span
          className={getColor(assignment)}
          data-hour={hour}
          data-time={time}
        >
          {props.date
            ? `${getDate(assignment.deadline.T)}`
            : `${getTime(assignment.deadline.T)}`
          }
        </span>
      </div>
    )
  }

  const AssignmentFull = ({ assignment }) => {
    return(
      <Table.Row>
        <Table.Col>
          <Link to={`/courses/${assignment.courseID}/assignments/${assignment.assignmentID}`}>
            {assignment.assignmentName}
          </Link>
        </Table.Col>
        <Table.Col>
          {assignment.courseName}
        </Table.Col>
        <Table.Col
          //Check if Past due and no submissions (submission check might have to be changed)
          className={getColor(assignment)}
        >
          {props.date
            ? `${getDate(assignment.deadline.T)}`
            : `${getTime(assignment.deadline.T)}`
          }
        </Table.Col>
      </Table.Row>
    )
  }
  
  return(
    <div
      id={props.id}
      className={`dateBody ${props.className || ''}`.trim()}
    >
      {props.calendar?.hours
        ? <>
            {Array.from({ length: 24 }, (value, index) => index).map((y) => {
              const assignments = props.assignments.filter(assignment => new Date(convertTime(assignment.deadline.T)).getHours() === y);
              const time = y > 11 ? (y - 12 || 12) + ' PM' : (y || 12) + ' AM';
              return(
                <ul
                  key={y}
                  className={`timeItem${(new Date()).getHours() === y ? ' now' : ''}${props.calendar?.hoursLabel ? ' label' : ''}`}
                  title='Hour'
                  role='button'
                  data-time={time}
                  data-hour={y}
                >
                    {assignments.map((assignment, i) =>
                      <li
                        key={i}
                        data-time={time}
                        data-hour={y}
                      >
                        <Assignment time={time} assignment={assignment} />
                      </li>
                    )}
                    {(assignments.length > 0 && props.calendar) &&
                      <div
                        className='mobile'
                        data-time={time}
                        data-hour={y}
                      >
                        {`${assignments.length} Due`}
                      </div>
                    }
                </ul>
              );
            })}
          </>
        : <>
            {!props.full
              ? <ul>
                  {props.assignments.sort(sortNewest).slice(0, 3).map((y, i) =>
                    <li
                      key={i}
                    >
                      <Assignment assignment={y} />
                    </li>
                  )}
                </ul>
              : <Table width='full'>
                  <Table.Heading>
                    <Table.Col>
                      Assignment
                    </Table.Col>
                    <Table.Col>
                      Course
                    </Table.Col>
                    <Table.Col>
                      Due
                    </Table.Col>
                  </Table.Heading>
                  {props.assignments.sort(sortNewest).map((y, i) =>
                    <AssignmentFull key={i} assignment={y} />
                  )}
                </Table>
            }
          </>
      }
      {!props.calendar && (props.assignments.length === 0
        ? <br></br>
        : <Link
            to={`/courses/${props.assignments[0].courseID}/assignments/`}
            className='mobile'
          >
            {`${props.assignments.length} Due`}
          </Link>
      )}
      {props.calendar && !props.calendar?.hours && (props.assignments.length === 0
        ? <br></br>
        : <div
            className='mobile'
          >
            {`${props.assignments.length} Due`}
          </div>
      )}
      {(props.assignments.length > 3 && !props.full) &&
        <Link
          to={`/courses/${props.courseID || props.assignments[0].courseID}/assignments`}
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
          const assignmentDate = new Date(convertTime(x.deadline.T));
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
            <Upcoming assignments={x.assignments} courseID={x.courseID} />
          </div>
        )
      })}
    </Card>
  )
}