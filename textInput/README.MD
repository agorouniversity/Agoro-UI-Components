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
type='text'(default) , 'email' , 'password' , etc.
size='full' or 'medium' or omit for small
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