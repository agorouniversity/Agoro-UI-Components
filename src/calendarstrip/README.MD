# UI Components

## Caldendar

Usage: 

`import { Calendar, Upcoming } from './components/UI/UI';` 

Calendastrip is a small calendar that shows 5 days ahead and the assignments due on each day.

Calendar supports props:

```
id=<string>
className=<string>
assignments=<array<object>> (Array of assignments with title and due timestamp)
```

```
{
  assignments: [
    {
      title: 'assignment 1',
      due: 1679439138979
    },
    {
      title: 'HW2',
      due: 1679439006092
    },
    {
      title: 'Project',
      due: 1679439006092
    }
  ]
}
```

Example:

```
<Calendar 
  assignments={assignments}
/>
```