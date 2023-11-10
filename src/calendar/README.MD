# UI Components

## Caldendar

Usage: 

`import { FullCalendar } from './components/UI/UI';` 

FullCalendar is a large calendar that displays a full month, week, or day calendar and the assignments due.
Week and Day views also show each hour throughout the day and places due assignments on their appropriate time slot.

FullCalendar supports props:

```
type=<'Month' || 'Week' || 'Day'>
assignments=<array<object>> (Array of assignments with title, due timestamp, and courseName)
date=<Date> (Date to base calender off of, if blank it will use current date)
```

```
{
  assignments: [
    {
      title: 'assignment 1',
      due: 1679439138979,
      courseName: 'MATH 4120'
    },
    {
      title: 'HW2',
      due: 1679439006092,
      courseName: 'MATH 4120'
    },
    {
      title: 'Project',
      due: 1679439006092,
      courseName: 'MATH 4120'
    }
  ]
}
```

Example:

```
<FullCalendar
  type='Month'
  date={new Date()}
  assignments={assignments}
/>
```