# UI Components

## Header

Usage: 

`import { Header } from './components/UI/UI';`

(Includes Header, Header.Buttons, Header.DropDown)

Full width header on top of the page
 
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