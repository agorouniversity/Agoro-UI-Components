# UI Components

## Grade

Usage: 

`import { Grade } from './components/UI/UI';`

Grade is a pill that changes fill and color based on supplied percent

Grade supports props:

```
id=<string>
className=<string>
points=<float>
total=<float>
```

Example:

```
<Grade 
  points={70}
  total={100}
> 
  70 / 100
</Grade>
```