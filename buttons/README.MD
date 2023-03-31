# UI Components

## Buttons

Usage: 

`import { ButtonA, ButtonB, IconButton } from './components/UI/UI';`

Buttons components support props:

```
id=<string>
className=<string>
onClick=<function>
type='submit' or 'reset' or 'button'(default)
size='large' or omit for small
disabled
```

IconButton also supports:

```
size='large', 'medium' (default), 'small
icon=<string> (Icon name or omit to incude your own icon as a child)
light=<bool> (Light colored icon)
```

example:

```
<ButtonA 
  onClick={() => {alert("clicked")}}
  size="large"
>
  Click me
</ButtonA>
```

```
  <IconButton icon='google'/>

  <IconButton>
    <svg>Svg here</svg>
  </IconButton>
```