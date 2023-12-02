import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { FullCalendar } from './calendar';

const mockAssignment = (date, name='HW 3') => {
  return(
    {
      assignmentName: name,
      courseID: 1,
      totalPoints: 50,
      points: 30,
      deadline: {
        T: date.getTime()
      }
    }
  )
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

describe.each([
  [new Date(1582987480000), 'Leap year'], //leap year
  [new Date(), 'Now'],
  [new Date(1828689648000), 'Random date'],
  [new Date(1645764773000), 'Random date'],
  [new Date(1420223486001), 'Random date'],
  [new Date(1066397258679), 'Random date']
])('%s %s', (date) => {

  test('Calendar month view is shown', () => {
    render(
      <FullCalendar type={'Month'} assignments={[]} date={date}/>
    );

    const day = new RegExp(`^${(date).getDate()}$`);
    expect(screen.getByText(day)).toBeInTheDocument();
    days.forEach(day =>
      expect(screen.getByText(day)).toBeInTheDocument()
    )
    const cells = screen.getAllByTitle('Day');
    expect([35, 42]).toContain(cells.length);
  });

  test('Calendar week view is shown', () => {
    render(
      <FullCalendar type={'Week'} assignments={[]} date={date}/>
    );

    days.forEach(day =>
      expect(screen.getByText(day)).toBeInTheDocument()
    )

    const day = new RegExp(`^${(date).getDate()}$`);
    expect(screen.getByText(day)).toBeInTheDocument();
    const cells = screen.getAllByTitle('Hour');
    expect(cells).toHaveLength(168);
  });

  test('Calendar day view is shown', () => {
    render(
      <FullCalendar type={'Day'} assignments={[]} date={date}/>
    );

    let tmp = [...days];
    const today = tmp.splice((date).getDay(), 1)[0];
    expect(screen.getByText(today)).toBeInTheDocument();

    const day = new RegExp(`^${(date).getDate()}$`);
    expect(screen.getByText(day)).toBeInTheDocument();
    const cells = screen.getAllByTitle('Hour');
    expect(cells).toHaveLength(24);
  });

  test('Assignment is shown in month view', () => {
    render(
      <MemoryRouter>
        <FullCalendar
          type={'Month'}
          assignments={[mockAssignment(date)]}
          date={date}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('HW 3')).toBeInTheDocument();
  })

  test('Assignment is shown in day view', () => {
    render(
      <MemoryRouter>
        <FullCalendar
          type={'Day'}
          assignments={[mockAssignment(date)]}
          date={date}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('HW 3')).toBeInTheDocument();
  })

  test('Assignment is shown in week view', () => {
    render(
      <MemoryRouter>
        <FullCalendar
          type={'Week'}
          assignments={[mockAssignment(date)]}
          date={date}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('HW 3')).toBeInTheDocument();
  })

  test('Multiple assignments shown', () => {
    render(
      <MemoryRouter>
        <FullCalendar
          type={'Month'}
          assignments={[mockAssignment(date), mockAssignment(date, 'HW 4')]}
          date={date}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('HW 3')).toBeInTheDocument();
    expect(screen.getByText('HW 4')).toBeInTheDocument();
  })

  test('Assignment future month not shown', () => {
    const future = new Date(date.getTime());
    future.setMonth(future.getMonth() + 2);

    render(
      <MemoryRouter>
        <FullCalendar
          type={'Month'}
          assignments={[mockAssignment(date), mockAssignment(future, 'HW 4')]}
          date={date}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('HW 3')).toBeInTheDocument();
    expect(screen.queryByText('HW 4')).not.toBeInTheDocument();
  })

  test('Assignment future week not shown', () => {
    const future = new Date(date.getTime());
    future.setDate(future.getDate() + 7);

    render(
      <MemoryRouter>
        <FullCalendar
          type={'Week'}
          assignments={[mockAssignment(date), mockAssignment(future, 'HW 4')]}
          date={date}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('HW 3')).toBeInTheDocument();
    expect(screen.queryByText('HW 4')).not.toBeInTheDocument();
  })

  test('Assignment future day not shown', () => {
    const future = new Date(date.getTime());
    future.setDate(future.getDate() + 1);

    render(
      <MemoryRouter>
        <FullCalendar
          type={'Day'}
          assignments={[mockAssignment(date), mockAssignment(future, 'HW 4')]}
          date={date}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('HW 3')).toBeInTheDocument();
    expect(screen.queryByText('HW 4')).not.toBeInTheDocument();
  })

  test('Day can be clicked in month view', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <FullCalendar
          type={'Month'}
          assignments={[mockAssignment(date)]}
          date={date}
        />
      </MemoryRouter>
    );

    const day = new RegExp(`^${(date).getDate() < 15 ? (date).getDate() + 1 : (date).getDate() - 1}$`);
    const click = screen.getByText(day);
    await user.click(click);

    await waitFor(() => {
      expect(screen.queryAllByText('Due')).toHaveLength(1);
    })

    await waitFor(() => {
      expect(screen.getByText('Close')).toBeInTheDocument();
    })
    
    await waitFor(() => {
      expect(screen.getByText('No assignments')).toBeInTheDocument();
    })
  })

  test('Day with assignment can be clicked in month view', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <FullCalendar
          type={'Month'}
          assignments={[mockAssignment(date)]}
          date={date}
        />
      </MemoryRouter>
    );
    
    const day = new RegExp(`^${(date).getDate()}$`);
    const click = screen.getByText(day);
    await user.click(click);

    await waitFor(() => {
      expect(screen.queryAllByText('Due')).toHaveLength(2);
    })

    await waitFor(() => {
      expect(screen.getByText('Close')).toBeInTheDocument();
    })
    
    await waitFor(() => {
      expect(screen.queryAllByText('HW 3')).toHaveLength(2);
    })
  })

})