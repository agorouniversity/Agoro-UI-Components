# UI Components

## Grade

Usage: 

`import { Grade } from './components/UI/UI';`

Grade is a pill that changes fill and color based on supplied number

Grade supports props:

```
id=<string>
className=<string>
grade=<float>
```

Example:

```
<Grade 
  grade={70}>
> 
  70 / 100
</Grade>
```