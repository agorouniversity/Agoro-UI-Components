# UI Components

## TextInput

Usage: 

`import { TextInput } from './components/UI/UI';`

TextInput supports props:

```
id=<string>
className=<string>
placeholder=<string>
defaultValue=<string>
onChange=<function>
type='text'(default) , 'email' , 'password' , etc.
size='small'(default) , 'medium', 'full
multiline=<boolean>
required
```

example:

```
<TextInput
  placeholder='Type...'
  width='full'
  onChange={() => {alert('Changed')}}
  required
></TextInput>
```