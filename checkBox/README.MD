# UI Components

## CheckBox

Usage: 

`import { CheckBox } from './components/UI/UI';` 

(includes CheckBox, CheckBox.Item)

CheckBox supports props:

```
id=<string>
className=<string>
name=<string> (You must set a name, the checkbox items become named name + index)
selected=<array<int>> or <int> (Which checkbox indicies you want selected by default)
onChange=<function>
```

CheckBox.Item supports props:

```
className=<string>
value=<string> (required)
```

example:

```
<CheckBox selected={[1, 2]} name="cool-buttons" onChange={(e) => alert(e.target.value)}>
  <CheckBox.Item value='1'>one</CheckBox.Item>
  <CheckBox.Item value='2'>two</CheckBox.Item>
  <CheckBox.Item value='3'>Click Me!</CheckBox.Item>
</CheckBox>
```