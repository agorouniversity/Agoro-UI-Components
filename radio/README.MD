# UI Components

## Radio Button

Usage: 

`import { Radio } from './components/UI/UI';` 

(includes Radio, Radio.Item)

Radio supports props:

```
id=<string>
className=<string>
name=<string> (You must set a name, the radio buttons will inherit the same name)
selected=<int> (Which radio button index you want selected by default)
onChange=<function>
```

Radio.Item supports props:

```
className=<string>
value=<string> (required)
disabled=<boolean>
```

example:

```
<Radio selected={0} name="cool-buttons" onChange={(e) => alert(e.target.value)}>
  <Radio.Item value='1'>one</Radio.Item>
  <Radio.Item value='2'>two</Radio.Item>
  <Radio.Item value='3'>Click Me!</Radio.Item>
</Radio>
```