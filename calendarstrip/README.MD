# UI Components

## Caldendar

Usage: 

`import { Calendar } from './components/UI/UI';` 


Calendar supports props:

```
id=<string>
className=<string>
assignments=<list<object>> (list of assignments with title and due timestamp)
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