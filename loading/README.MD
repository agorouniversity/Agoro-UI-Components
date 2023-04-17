# UI Components

## Loading

Usage: 

`import { Loading } from './components/UI/UI';` 

Loading supports props:

```
id=<string>
className=<string>
size=<string> 'full', 'fullscreen', 'auto'(Whether the loading component takes up the whole page)
```

Example:

```
<Loading
  fullScreen={true}
>
</Loading>
```