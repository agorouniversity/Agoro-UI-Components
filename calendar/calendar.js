import { useEffect, useState } from 'react';
import { Card, Modal, Upcoming } from '../UI';
import { convertTime, getDayOfWeek } from '../../../util/time';
import './calendar.css';

export const FullCalendar = (props) => {
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const [modal, setModal] = useState({open: false, data: undefined})

  useEffect(() => {
    const createMonth = () => {
      const date = new Date(props.date.getTime()) || new Date();
      if(props.type !== 'Week' && props.type !== 'Day') {
        date.setDate((new Date(date.getFullYear(), date.getMonth(), 1)).getDate());
      }
      date.setHours(0, 0, 0, 0);
      const month = date.getMonth();
      let days = [];
      while(date.getMonth() === month) {
        days.push({date: date.getTime()});
        if(props.type === 'Day') {
          break;
        }
        if(props.type === 'Week' && date.getDay() === 6) {
          break;
        }
        date.setDate(date.getDate() + 1);
      }

      if(props.type !== 'Day') {
        const firstDay = new Date(days[0].date);
        const lastDay = new Date(days[days.length - 1].date);
        while(firstDay.getDay() !== 0) {
          firstDay.setHours(0, 0, 0, 0);
          firstDay.setDate(firstDay.getDate() - 1);
          days.unshift({date: firstDay.getTime(), otherMonth: firstDay.getMonth() !== date.getMonth()});
        }
        while(lastDay.getDay() !== 6) {
          lastDay.setHours(0, 0, 0, 0);
          lastDay.setDate(lastDay.getDate() + 1);
          days.push({date: lastDay.getTime(), otherMonth: true});
        }
      }

      setDates(days);
    }

    createMonth();
  }, [props.date, props.type])

  const getAssignments = (event, list) => {
    if(props.type === 'Week' || props.type === 'Day') {
      return(
        list.filter((assignment) => {
          let due = new Date(convertTime(assignment.deadline.T));
          return(parseInt(event.target.dataset.hour) === due.getHours());
        })
      )
    }
    return(list);
  }

  useEffect(() => {
    setData(
      dates.map((date, i) => ({
        deadline: date.date,
        otherMonth: date.otherMonth,
        assignments: props.assignments.filter(x => {
          const assignmentDate = new Date(convertTime(x.deadline.T));
          assignmentDate.setHours(0, 0, 0, 0);
          return(assignmentDate.getTime() === date.date);
        })
      }))
    );
  }, [props.assignments, dates])

  return(
    <>
      <Modal open={modal.open} cancel={() => setModal({open: false})} closeBtn>
        {modal.date &&
          <>
            <Modal.Title>{modal.date.toLocaleString('default', {weekday: 'long'})} {modal.date.toLocaleString('default', { month: 'long' })} {modal.date.getDate()} {modal.date.getFullYear()}</Modal.Title>
            <Modal.Body>
              <h2>Due {modal.hour ? `at ${modal.hour}` : ''}</h2>
              {modal.assignments.length > 0
                ? <Upcoming
                    calendar={{
                      hours: false,
                      hoursLabel: false
                    }}
                    assignments={modal.assignments}
                    full
                  />
                : <span>No assignments</span>
              }
            </Modal.Body>
          </>
        }
      </Modal>
      <Card
        id={props.id}
        width='full'
        className={`fullCalendar ${data.length > 35 ? 'long ' : ''}${props.type} ${props.className || ''}`.trim()}
      >
        <div className='headerBg'></div>
        {(() => {
          let rows = Math.ceil(data.length / 7);

          return(data.map((x, i) => {
            const thisDay = new Date(x.deadline);
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            const today = !x.prevMonth && now.getTime() === thisDay.getTime();
            if(i % 7 === 0) {
              rows --;
            }
            return(
              <div
                key={i}
                onClick={
                  (event) => 
                    !x.prevMonth
                      ? setModal({
                          open: true,
                          date: thisDay,
                          hour: event.target.dataset.time,
                          assignments: getAssignments(event, x.assignments)
                        })
                      : null
                }
                role='gridcell'
                aria-label='day cell'
                className={`date${rows !== 0 ? ' bottom' : ''}${(i + 1) % 7 === 0 ? ' end' : ''}${today ? ' today' : ''}${i < 7 ? ' header' : ''}${x.otherMonth ? ' otherMonth' : ''} ${props.type}`}
              >
                {i < 7 &&
                  <>
                    <h3
                      className='dateHeading'
                    >
                      {`${getDayOfWeek(thisDay, true)}`}
                    </h3>
                    <h3
                      className='dateHeadingMobile'
                    >
                      {`${getDayOfWeek(thisDay)}`}
                    </h3>
                  </>
                }
                {!x.otherMonth
                  ? <div className='dateText'>{props.type === 'Day' ? <h3>{thisDay.getDate()}</h3> : thisDay.getDate()}</div>
                  : <div className='dateText prev'>{thisDay.getMonth() + 1}/{thisDay.getDate()}</div>
                }
                <Upcoming
                  calendar={{
                    hours: props.type === 'Week' || props.type === 'Day',
                    hoursLabel: i === 0
                  }}
                  assignments={x.assignments}
                />
              </div>
            )
          }))
        })()}
      </Card>
    </>
  )
}