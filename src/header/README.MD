# UI Components

## Header

Usage: 

`import { Header } from '@agorouniversity/agoro-ui-components';`

(Includes Header, Header.Buttons, Header.DropDown)

Header.Buttons includes logo title and right justified buttons

Header components support props:

```
id=<string>
className=<string>
dropDownOpen=<bool> (If dropdown is displayed)
```

example:

```
<Header dropDownOpen={drop}>
  <Header.Buttons>
    <button>Logout</button>
  </Header.Buttons>
  <Header.DropDown>
  <Login />
  </Header.DropDown>
</Header>
```