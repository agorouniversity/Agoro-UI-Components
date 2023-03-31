# UI Components

## Loading

Usage: 

`import { Loading } from './components/UI/UI';` 

Loading supports props:

```
id=<string>
className=<string>
size=<string> 'full', 'fullScreen', 'auto'(Whether the loading component takes up the whole page or whole container)
```

Example:

```
<Loading
  fullScreen={true}
>
</Loading>
```