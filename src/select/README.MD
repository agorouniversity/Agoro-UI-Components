# UI Components

## Select

Usage: 

`import { Select, MultiSelect } from './components/UI/UI';`

Select emulates the HTML <select> element with custom styling

MultiSelect is like select but allows for selecting multiple items and entering custom values

MultiSelect supports props:

```
id=<string>
className=<string>
label=<string> (Title to display over the select box)
placeholder=<string>
deleteItem=<function> (Callback to when an item is deleted)
addItem=<function> (Callback to when an item is added)
```

Select supports props:

```
id=<string>
className=<string>
label=<string> (Title to display over the select box)
placeholder=<string>
addItem=<function> (Callback when an item is selected)
addObject=<function> (Callback when item is selected returns {index: <int>, item: <string> })
value=<string> (Default selected value)
items=<array<string>> (List of items to select from)
disabled=<boolean>
```

Example:

```
<Select 
  label='Filetype' 
  placeholder='Select' 
  deleteItem={(item) => console.log('delete', item)} 
  addItem={(item) => console.log('add', item)} 
  items={['.css', '.js', '.html', '.go']}
/>
```