# UI Components

## Badge

Usage:

`import { Badge } from './components/UI/UI';`

(Includes Badge, Badge.Only)

Badge is a small circle in the top right corner that shows a number, example use: For displaying number of notifications. Badge wraps component with position: `relative, display: inline-block`, Badge.Only is only the Badge circle for custom placement.

Badge and Badge.Only supports props:

```
id=<string>
className=<string>
number=<integer> (Number to show in corner)
```

Example:

```
<Badge number={10}>
  <button>Messages</button>
</Badge>
```

```
<Badge.Only number={2}/>
```