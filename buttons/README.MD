# UI Components

## Buttons

Usage: 

`import { ButtonA, ButtonB } from './components/UI/UI';`

ButtonA and ButtonB components support props:

```
id=<string>
className=<string>
onClick=<function>
type='submit' or 'reset' or 'button'(default)
size='large' or omit for small
disabled
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