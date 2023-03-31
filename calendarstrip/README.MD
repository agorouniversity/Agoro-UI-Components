# UI Components

## Calendar

Usage: 

`import { Calendar, Upcoming } from './components/UI/UI';`

Calendar is a component that displays a horizontal list of five days ahead along with the assignments due on each day

Calendar component support props:

```
id=<string>
className=<string>
assignments=<array<object>> (List of assignments)
```

Assignments array ex:

```
  assignments = [
    {
      assignmentName: <string>,
      deadline: <integer> (timestamp)
    }
  ]
```

Example:

```
<Calendar assignments={assignments} />
```

Upcoming is a small formatted list of assignments that displays a list of four assignments, due date or time, and a link to view more

Upcoming component support props:

```
id=<string>
className=<string>
date=<boolean> (true = show due date, false = show due time)
assignments=<array<object>> (List of assignments)
```

Example:

```
<Upcoming date={true} assignments={assignments} />
```